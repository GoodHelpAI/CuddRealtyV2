// src/app/page.tsx
'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import type { FormData, Room, Patio, Shed, AnyChipGroupKey, FormChipGroupKeys, RoomChipGroupBaseKeys, ChipGroupCompositeKeyForRoom } from '@/interfaces';
import { initialRoomValues } from '@/data/form-options';
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Import Step Components
import Step1PropertyInfo from '@/components/form-steps/Step1PropertyInfo';
import Step2ExteriorFeatures from '@/components/form-steps/Step2ExteriorFeatures';
import Step3InteriorFeatures from '@/components/form-steps/Step3InteriorFeatures';
import Step4Rooms from '@/components/form-steps/Step4Rooms';
import Step5Flooring from '@/components/form-steps/Step5Flooring';
import Step6LotAndCommunity from '@/components/form-steps/Step6LotAndCommunity';
import Step7AdditionalInfo from '@/components/form-steps/Step7AdditionalInfo';
import { FormNavigation } from '@/components/form-steps/FormNavigation';
import { StepProgress } from '@/components/form-steps/StepProgress';

const initialFormData: FormData = {
  streetAddress: '', city: '', state: '', zipCode: '', propertyType: 'Single Family',
  totalBedrooms: 3, totalBathrooms: 2,
  exteriorFeatures: { brick: false, cementSiding: false, vinylSiding: false, woodSiding: false, stucco: false, gutters: false, },
  hoa: 'No', monthlyHoaDues: '', rooms: [],
  carport: 'No', carportLengthFt: '', carportWidthFt: '', rvPad: 'No', rvPadLengthFt: '', rvPadWidthFt: '',
  flooringTypes: {
    carpet: false, tile: false, vinylPlank: false, hardwood: false,
    laminateWood: false, stainedConcrete: false, linoleum: false, wood: false, marble: false,
  },
  specifyOtherFlooringType: '', roofType: '', hasPatios: 'No', patios: [], hasSheds: 'No', sheds: [],
  hasFireplace: 'No', numberOfFireplaces: '0',
  fireplaceFeatures: { wood: false, gas: false, gasLogs: false, electricStarter: false, vaultedCeilingsNearFP: false, programmableThermostatFP: false, },
  waterHeaterType: '', acType: '', acTypeOther: '', heatType: '',
  pool: 'No', hotTubSpa: 'No', sprinklerSystem: 'No', alarmSystem: 'No', numberOfSmokeDetectors: '', lotNumber: '',
  yardFeatures: { backyardGrass: false, someTrees: false, noTrees: false, },
  communityAmenities: { pool: false, park: false, walkingPaths: false, clubHouse: false, weightRoom: false, greenbelt: false, playground: false, tennis: false, pond: false, },
  deck: 'No', fenceHeight: '',
  fenceMaterials: { wood: false, vinyl: false, chainLink: false }, programmableThermostat: 'No',
  additionalPropertyDescription: '',
};

const TOTAL_STEPS = 7;

export default function CuddRealtyFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Handles changes for most input types (text, select, textarea, root checkboxes)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        // Handles nested checkboxes like fireplaceFeatures.wood
        if (name.includes('.')) {
            const [group, key] = name.split('.');
            setFormData(prev => {
              const groupData = prev[group as keyof FormData] as object;
              return { ...prev, [group]: { ...groupData, [key]: checked }};
            });
        } else {
          // Handles root level simple checkboxes (if any were to be added)
          // This part is likely not used if all checkboxes are handled by chip toggles or specific handlers
          setFormData(prev => ({ ...prev, [name]: checked }));
        }
    } else {
      // Handles text, select, textarea
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handles changes for slider inputs
  const handleSliderChange = (name: 'totalBedrooms' | 'totalBathrooms', value: string | number) => {
    const numericValue = typeof value === 'string' ? (name === 'totalBathrooms' ? parseFloat(value) : parseInt(value, 10)) : value;
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  // Handles changes for radio button groups
  const handleRadioChange = (nameComposite: keyof FormData | `kitchenFridgeIncluded-${string}` | `kitchenFridgeColor-${string}` | `kitchenDisposal-${string}` | `kitchenDishwasherIncluded-${string}`, value: string) => {
    if (typeof nameComposite === 'string' && (
        nameComposite.startsWith('kitchenFridgeIncluded-') || 
        nameComposite.startsWith('kitchenFridgeColor-') ||
        nameComposite.startsWith('kitchenDisposal-') ||
        nameComposite.startsWith('kitchenDishwasherIncluded-')
        )) {
        const firstHyphenIndex = nameComposite.indexOf('-');
        const fieldName = nameComposite.substring(0, firstHyphenIndex) as keyof Pick<Room, 'kitchenFridgeIncluded' | 'kitchenFridgeColor' | 'kitchenDisposal' | 'kitchenDishwasherIncluded'>;
        const actualRoomId = nameComposite.substring(firstHyphenIndex + 1);

        handleRoomFieldChange(actualRoomId, fieldName, value);
        if (fieldName === 'kitchenFridgeIncluded' && value === 'No') {
            handleRoomFieldChange(actualRoomId, 'kitchenFridgeColor', '');
        }
    } else {
        setFormData(prev => ({ ...prev, [nameComposite as keyof FormData]: value as any }));
        if (nameComposite === 'hasFireplace' && value === 'No') {
            setFormData(prev => ({ ...prev, numberOfFireplaces: '0', fireplaceFeatures: initialFormData.fireplaceFeatures }));
        }
    }
  };

  // Handles toggling for chip button groups
  const handleChipToggle = (groupNameComposite: AnyChipGroupKey, key: string) => {
    if (groupNameComposite.startsWith('kitchenRangeType-') || groupNameComposite.startsWith('kitchenCabinetSize-')) {
        const firstHyphenIndex = groupNameComposite.indexOf('-');
        const fieldName = groupNameComposite.substring(0, firstHyphenIndex) as RoomChipGroupBaseKeys;
        const actualRoomId = groupNameComposite.substring(firstHyphenIndex + 1);

        setFormData(prev => ({
            ...prev,
            rooms: prev.rooms.map(room => {
                if (room.id === actualRoomId) {
                    const currentGroupState = (room[fieldName] || {}) as Record<string, boolean>;
                    const updatedGroupState = { ...currentGroupState, [key]: !currentGroupState[key] };
                    if (fieldName === 'kitchenCabinetSize' && key === 'other' && !updatedGroupState.other) {
                        return { ...room, [fieldName]: updatedGroupState, kitchenCabinetSizeOther: '' };
                    }
                    return { ...room, [fieldName]: updatedGroupState };
                }
                return room;
            })
        }));
    } else {
        setFormData(prev => {
          const group = prev[groupNameComposite as FormChipGroupKeys] as Record<string, boolean>;
          return { ...prev, [groupNameComposite as FormChipGroupKeys]: { ...group, [key]: !group[key] } };
        });
    }
  };

   const addRoom = () => {
    setFormData(prev => ({ ...prev, rooms: [ ...prev.rooms,
        { 
          id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
          ...initialRoomValues
        },],}));};

  const handleRoomFieldChange = (roomId: string, fieldName: keyof Room, value: string | number | boolean | Record<string, boolean>) => {
    setFormData(prev => ({ ...prev, rooms: prev.rooms.map(room => room.id === roomId ? { ...room, [fieldName]: value } : room ), }));
  };

  const removeRoom = (roomId: string) => { setFormData(prev => ({ ...prev, rooms: prev.rooms.filter(room => room.id !== roomId) })); };

  const addPatio = () => { setFormData(prev => ({ ...prev, patios: [ ...prev.patios, { id: `patio-${Date.now()}-${Math.random().toString(36).substr(2,5)}`, lengthFt: '', widthFt: '', isCovered: false, isUncovered: false, isConcrete: false, isPavers: false, isGravel: false } ] })); };
  const handlePatioChange = (patioId: string, fieldName: keyof Omit<Patio, 'id'>, value: string | boolean) => {
    setFormData(prev => ({ ...prev, patios: prev.patios.map(p => p.id === patioId ? { ...p, [fieldName]: value } : p) }));
  };
  const removePatio = (patioId: string) => { setFormData(prev => ({ ...prev, patios: prev.patios.filter(p => p.id !== patioId) })); };

  const addShed = () => { setFormData(prev => ({ ...prev, sheds: [...prev.sheds, { id: `shed-${Date.now()}-${Math.random().toString(36).substr(2,5)}`, lengthFt: '', widthFt: '' }] })); };
  const handleShedChange = (shedId: string, fieldName: keyof Omit<Shed, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, sheds: prev.sheds.map(s => s.id === shedId ? { ...s, [fieldName]: value } : s) }));
  };
  const removeShed = (shedId: string) => { setFormData(prev => ({ ...prev, sheds: prev.sheds.filter(s => s.id !== shedId) })); };
  
  const processNextStep = () => {
    // Add validation logic here per step if needed
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
     window.scrollTo(0, 0); 
  };
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0); 
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (currentStep < TOTAL_STEPS) {
      processNextStep();
      return;
    }

    // Final submission logic
    setIsSubmitting(true);
    setSubmissionStatus('Submitting...');
    console.log("Final Form Data:", JSON.stringify(formData, null, 2));

    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL_PLACEHOLDER';
    if (n8nWebhookUrl === 'YOUR_N8N_WEBHOOK_URL_PLACEHOLDER') {
      toast({ title: "Webhook URL Not Set", description: "Please configure NEXT_PUBLIC_N8N_WEBHOOK_URL.", variant: "destructive" });
      setSubmissionStatus('Error: Webhook URL missing.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmissionStatus('Form submitted successfully!');
        toast({ title: "Success!", description: "Form data submitted successfully."});
        // Optionally reset form: setFormData(initialFormData); setCurrentStep(1);
      } else {
        const errorText = await response.text();
        setSubmissionStatus(`Error: ${response.status} ${response.statusText}. ${errorText}`);
        toast({ title: "Submission Error", description: `${response.status} ${errorText}`, variant: "destructive"});
      }
    } catch (error: any) {
      setSubmissionStatus(`An error occurred: ${error.message}`);
      toast({ title: "Network Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = {
    formData, handleChange, handleRadioChange, handleSliderChange, handleChipToggle,
    handleRoomFieldChange, addRoom, removeRoom,
    addPatio, handlePatioChange, removePatio,
    addShed, handleShedChange, removeShed,
    setFormData // Pass setFormData for more complex direct manipulations if needed by a step
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-card p-6 md:p-10 border-2 border-black shadow-[8px_8px_0px_#000000]">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Cudd Realty Measurement Form</h1>
          <p className="text-muted-foreground mt-2">Please fill out the property details accurately.</p>
        </header>

        <StepProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        
        <form onSubmit={handleFormSubmit} className="space-y-8">
          {currentStep === 1 && <Step1PropertyInfo {...stepProps} />}
          {currentStep === 2 && <Step2ExteriorFeatures {...stepProps} />}
          {currentStep === 3 && <Step3InteriorFeatures {...stepProps} />}
          {currentStep === 4 && <Step4Rooms {...stepProps} />}
          {currentStep === 5 && <Step5Flooring {...stepProps} />}
          {currentStep === 6 && <Step6LotAndCommunity {...stepProps} />}
          {currentStep === 7 && <Step7AdditionalInfo {...stepProps} />}
          
          <FormNavigation currentStep={currentStep} totalSteps={TOTAL_STEPS} prevStep={prevStep} isSubmitting={isSubmitting} />
        </form>
        
        {submissionStatus && (
          <div className={`mt-4 p-3 border-2 border-black text-sm ${submissionStatus.startsWith('Error') ? 'bg-destructive text-destructive-foreground' : 'bg-green-200 text-green-800'}`}>
            {submissionStatus}
          </div>
        )}
      </div>
    </main>
  );
}
