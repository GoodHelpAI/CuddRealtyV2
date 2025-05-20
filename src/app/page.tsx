// src/app/page.tsx
// Make sure you have Next.js (App Router) and Tailwind CSS setup in your project.

'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ReviewCard from "@/components/form-steps/ReviewCard";

// --- Interfaces ---
interface RoomTypeDetail {
  value: string; label: string; icon: string; name: string;
}
interface Patio {
  id: string; lengthFt: string; widthFt: string;
  isCovered: boolean; isUncovered: boolean; isConcrete: boolean; isPavers: boolean; isGravel: boolean;
}
interface Shed {
  id: string; lengthFt: string; widthFt: string;
}

type KitchenApplianceColorType = 'Stainless Steel (SS)' | 'Black (B)' | 'White (W)' | 'Mixed' | 'Panel Ready' | 'Other' | '';
type FloorLevelType = '1st' | '2nd' | '3rd' | 'Basement' | '';


interface Room {
  id: string; roomType: string; customRoomName: string; lengthFt: string; widthFt: string;
  floorLevel?: FloorLevelType;
  fan: 'Yes' | 'No' | 'N/A';
  washerDryerHookups: 'Yes' | 'No' | 'N/A';
  walkInCloset: 'Yes' | 'No' | 'N/A_WC';
  kitchenIsland: boolean; kitchenRaisedBar: boolean; kitchenEatIn: boolean;
  kitchenCountertop: 'Granite' | 'Laminate' | 'Corian' | 'Tile' | 'Quartz' | 'Solid Surface' | 'Marble' | 'Other' | '';
  kitchenWalkInPantry: boolean; kitchenTileBacksplash: boolean; kitchenButlersPantry: boolean;
  kitchenCabinetSize: { s30inch: boolean; s36inch: boolean; s42inch: boolean; custom: boolean; other: boolean; };
  kitchenCabinetSizeOther: string;
  kitchenAppliancesColor: KitchenApplianceColorType;
  kitchenFridgeIncluded: 'Yes' | 'No';
  kitchenFridgeColor: 'White (W)' | 'Black (B)' | 'Stainless Steel (SS)' | '';
  kitchenMicrowaveType: 'Flush-mount' | 'Countertop' | 'Built-in' | 'Above Range (Hood Combo)' | 'Drawer' | 'None' | '';
  kitchenDishwasherIncluded: 'Yes' | 'No' | 'Negotiable';
  kitchenDishwasherColor: 'Stainless Steel (SS)' | 'Black (B)' | 'White (W)' | 'Matches Appliances' | 'Panel Ready' | 'Other' | '';
  kitchenDisposal: 'Yes' | 'No';
  kitchenCompactor: boolean;
  kitchenWineCooler: boolean;
  kitchenRangeType: {
    gasSingleOven: boolean; gasDoubleOven: boolean;
    electricSingleOven: boolean; electricDoubleOven: boolean;
    dualFuelSingleOven: boolean; dualFuelDoubleOven: boolean;
    cooktopOnly: boolean; wallOvenOnly: boolean; other: boolean;
  };
  kitchenCooktopFuel: 'Gas' | 'Electric' | 'Induction' | 'None (Range Only)' | 'Other' | '';
  kitchenCooktopStyle: 'Standard Burners' | 'Glass/Smooth Top' | 'Griddle Included' | 'Grill Included' | 'None' | '';
  kitchenVentHoodType: 'Standard Hood' | 'Microwave Hood Combo' | 'Downdraft' | 'Island Hood/Chimney' | 'Custom Insert' | 'None' | '';
  kitchenOutdoorGrill: boolean;
  garageSpaces: '0' | '1' | '2' | '3+' | '4+'; garageLengthFt: string; garageWidthFt: string;
  garageDoorOpeners: '0' | '1' | '2' | '3+'; garageIsAttached: 'Yes' | 'No' | 'N/A';
  garageIsFinished: 'Yes' | 'No' | 'N/A'; garageHasStorage: boolean; garageHasWorkshop: boolean;
  primaryBathGardenTub?: boolean;
  primaryBathJets?: boolean;
  primaryBathWalkInShower?: boolean;
  primaryBathSeparateVanities?: boolean;
  featuresNotes: string;
}
interface FormData {
  streetAddress: string; city: string; state: string; zipCode: string; propertyType: string;
  totalBedrooms: number; totalBathrooms: number;
  // Step 2 - Exterior Features
  exteriorFeatures: {
    brick: boolean; cementSiding: boolean; vinylSiding: boolean; woodSiding: boolean; stucco: boolean; gutters: boolean;
  };
  hoa: 'Yes' | 'No'; monthlyHoaDues: string;
  rooms: Room[];
  carport: 'Yes' | 'No'; carportLengthFt: string; carportWidthFt: string;
  rvPad: 'Yes' | 'No'; rvPadLengthFt: string; rvPadWidthFt: string;
  // Step 5 - Flooring
  flooringTypes: {
    carpet: boolean; tile: boolean; vinylPlank: boolean; hardwood: boolean;
    laminateWood: boolean; 
    stainedConcrete: boolean; 
    linoleum: boolean; 
    wood: boolean; 
    marble: boolean; 
  };
  specifyOtherFlooringType: string;
  roofType: string;
  hasPatios: 'Yes' | 'No'; patios: Patio[];
  hasSheds: 'Yes' | 'No'; sheds: Shed[];
  hasFireplace: 'Yes' | 'No';
  numberOfFireplaces: '0' | '1' | '2' | '3+';
  fireplaceFeatures: { wood: boolean; gas: boolean; gasLogs: boolean; electricStarter: boolean; vaultedCeilingsNearFP: boolean; programmableThermostatFP: boolean; };
  waterHeaterType: 'Gas' | 'Electric' | 'Tankless' | '';
  acType: 'Gas' | 'Electric' | 'Other' | ''; acTypeOther: string;
  heatType: 'Gas' | 'Electric' | 'Heat Pump' | '';
  pool: 'Yes' | 'No'; hotTubSpa: 'Yes' | 'No'; sprinklerSystem: 'Yes' | 'No'; alarmSystem: 'Yes' | 'No';
  numberOfSmokeDetectors: '0' | '1' | '2' | '3' | '4' | '5+' | '';
  lotNumber: string;
  yardFeatures: { backyardGrass: boolean; someTrees: boolean; noTrees: boolean; };
  communityAmenities: { pool: boolean; park: boolean; walkingPaths: boolean; clubHouse: boolean; weightRoom: boolean; greenbelt: boolean; playground: boolean; tennis: boolean; pond: boolean; };
  deck: 'Yes' | 'No'; fenceHeight: string;
  fenceMaterials: { wood: boolean; vinyl: boolean; chainLink: boolean; };
  programmableThermostat: 'Yes' | 'No';
  additionalPropertyDescription: string;
  submissionTimestamp?: string;
  submissionId?: string;
  formVersion?: string;
}

type FormChipGroupKeys = 'flooringTypes' | 'fenceMaterials' | 'yardFeatures' | 'communityAmenities' | 'exteriorFeatures'; 
type RoomChipGroupBaseKeys = 'kitchenRangeType' | 'kitchenCabinetSize';
type ChipGroupCompositeKeys = FormChipGroupKeys | `${RoomChipGroupBaseKeys}-${string}`;


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
  submissionTimestamp: '', 
  submissionId: '',
  formVersion: '',
};

const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
const propertyTypes = ['Single Family', 'Townhouse', 'Condo', 'Multi-Family', 'Land', 'Other'];
const roomTypeDetails: RoomTypeDetail[] = [
  { value: 'Living Room', icon: '🛋️', name: 'Living Room', label: '🛋️ Living Room' },
  { value: 'Dining Room', icon: '🍽️', name: 'Dining Room', label: '🍽️ Dining Room' },
  { value: 'Kitchen', icon: '🍳', name: 'Kitchen', label: '🍳 Kitchen' },
  { value: 'Breakfast Nook', icon: '🥐', name: 'Breakfast Nook', label: '🥐 Breakfast Nook' },
  { value: 'Primary Bedroom', icon: '🛏️', name: 'Primary Bedroom', label: '🛏️ Primary Bedroom' },
  { value: 'Bedroom', icon: '🛌', name: 'Bedroom', label: '🛌 Bedroom' },
  { value: 'Bathroom', icon: '🛁', name: 'Bathroom', label: '🛁 Bathroom' },
  { value: 'Office', icon: '💼', name: 'Office', label: '💼 Office' },
  { value: 'Study', icon: '📚', name: 'Study', label: '📚 Study' },
  { value: 'Game Room', icon: '🎮', name: 'Game Room', label: '🎮 Game Room' },
  { value: 'Media Room', icon: '🎬', name: 'Media Room', label: '🎬 Media Room' },
  { value: 'Bonus Room', icon: '🎉', name: 'Bonus Room', label: '🎉 Bonus Room' },
  { value: 'Utility Room', icon: '🧺', name: 'Utility Room', label: '🧺 Utility Room' },
  { value: 'Garage', icon: '🚗', name: 'Garage', label: '🚗 Garage' },
  { value: 'Other', icon: '❓', name: 'Other', label: '❓ Other' },
];
const floorLevelOptions: FloorLevelType[] = ['1st', '2nd', '3rd', 'Basement', ''];

const yesNoOptions = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}];
const yesNoNaOptions = ['Yes', 'No', 'N/A'];
const yesNoNegotiableOptions = ['Yes', 'No', 'Negotiable'];

const fireplaceNumberOptions = ['0', '1', '2', '3+'];
const waterHeaterOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Tankless', value:'Tankless'}];
const acOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Other', value:'Other'}];
const heatOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Heat Pump', value:'Heat Pump'}];
const smokeDetectorNumberOptions = ['0', '1', '2', '3', '4', '5+'];

const exteriorFeatureOptions: Record<keyof FormData['exteriorFeatures'], string> = {
    brick: "Brick",
    cementSiding: "Cement Siding",
    vinylSiding: "Vinyl Siding",
    woodSiding: "Wood Siding",
    stucco: "Stucco",
    gutters: "Gutters",
};

const flooringTypeOptions: Record<keyof FormData['flooringTypes'], string> = {
    carpet: "Carpet",
    tile: "Tile",
    vinylPlank: "Vinyl Plank",
    hardwood: "Hardwood",
    laminateWood: "Laminate Wood",
    stainedConcrete: "Stained Concrete",
    linoleum: "Linoleum",
    wood: "Wood",
    marble: "Marble",
};


const kitchenCountertopOptions = ['Granite', 'Laminate', 'Corian', 'Tile', 'Quartz', 'Solid Surface', 'Marble', 'Other', ''];
const kitchenCabinetSizeChipOptions = { s30inch: '30"', s36inch: '36"', s42inch: '42"', custom: 'Custom', other: 'Other (Specify)' };
const kitchenFridgeColorOptions = [{label:'White (W)', value:'White (W)'}, {label:'Black (B)', value:'Black (B)'}, {label:'Stainless Steel (SS)', value:'Stainless Steel (SS)'}];
const kitchenApplianceColorOptions: KitchenApplianceColorType[] = ['Stainless Steel (SS)', 'Black (B)', 'White (W)', 'Mixed', 'Panel Ready', 'Other', ''];
const kitchenMicrowaveTypeOptions = ['Flush-mount', 'Countertop', 'Built-in', 'Above Range (Hood Combo)', 'Drawer', 'None', ''];
const kitchenRangeTypeChipOptions = {
  gasSingleOven: 'Gas - Single Oven', gasDoubleOven: 'Gas - Double Oven',
  electricSingleOven: 'Electric - Single Oven', electricDoubleOven: 'Electric - Double Oven',
  dualFuelSingleOven: 'Dual Fuel - Single', dualFuelDoubleOven: 'Dual Fuel - Double',
  cooktopOnly: 'Cooktop Only', wallOvenOnly: 'Wall Oven Only', other: 'Other Range Type'
};
const kitchenCooktopFuelOptions = ['Gas', 'Electric', 'Induction', 'None (Range Only)', 'Other', ''];
const kitchenCooktopStyleOptions = ['Standard Burners', 'Glass/Smooth Top', 'Griddle Included', 'Grill Included', 'None', ''];
const kitchenVentHoodTypeOptions = ['Standard Hood', 'Microwave Hood Combo', 'Downdraft', 'Island Hood/Chimney', 'Custom Insert', 'None', ''];
const garageSpaceOptions = ['0', '1', '2', '3+', '4+'];
const garageDoorOpenerOptions = ['0', '1', '2', '3+'];


export default function CuddRealtyFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  // Handles changes for most input types (text, select, checkbox groups at root level)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        // Handles nested checkboxes like fireplaceFeatures.wood
        if (name.includes('.')) {
            const [group, key] = name.split('.');
            setFormData(prev => ({ ...prev, [group]: { ...(prev[group as keyof FormData] as object), [key]: checked }}));
        } else {
          // Handles root level simple checkboxes (if any were to be added)
          setFormData(prev => ({ ...prev, [name]: checked }));
        }
    } else {
      // Handles text, select, textarea
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handles changes for range slider inputs
  const handleSliderChange = (name: 'totalBedrooms' | 'totalBathrooms', value: string | number) => { 
    const numericValue = typeof value === 'number' ? value : (name === 'totalBathrooms' ? parseFloat(value) : parseInt(value, 10));
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  // Handles changes for radio button groups (root level and within rooms)
  const handleRadioChange = (nameComposite: keyof FormData | `kitchenFridgeIncluded-${string}` | `kitchenFridgeColor-${string}`, value: string) => {
    // Check if the radio group is for a specific room's kitchen feature
    if (typeof nameComposite === 'string' && (nameComposite.startsWith('kitchenFridgeIncluded-') || nameComposite.startsWith('kitchenFridgeColor-'))) {
        const firstHyphenIndex = nameComposite.indexOf('-');
        const fieldName = nameComposite.substring(0, firstHyphenIndex) as keyof Pick<Room, 'kitchenFridgeIncluded' | 'kitchenFridgeColor'>;
        const actualRoomId = nameComposite.substring(firstHyphenIndex + 1);

        handleRoomFieldChange(actualRoomId, fieldName, value);
        // If fridge is not included, reset its color
        if (fieldName === 'kitchenFridgeIncluded' && value === 'No') {
            handleRoomFieldChange(actualRoomId, 'kitchenFridgeColor', '');
        }
    } else {
        // Handles root level radio groups
        setFormData(prev => ({ ...prev, [nameComposite as keyof FormData]: value as any }));
        // If no fireplace, set number of fireplaces to 0
        if (nameComposite === 'hasFireplace' && value === 'No') {
            setFormData(prev => ({ ...prev, numberOfFireplaces: '0' }));
        }
    }
  };

  // Handles toggling for chip button groups (root level and within rooms)
  const handleChipToggle = (
    groupNameComposite: ChipGroupCompositeKeys,
    key: string
  ) => {
    // Check if the chip group is for a specific room's kitchen feature
    if (groupNameComposite.startsWith('kitchenRangeType-') || groupNameComposite.startsWith('kitchenCabinetSize-')) {
        const firstHyphenIndex = groupNameComposite.indexOf('-');
        const fieldName = groupNameComposite.substring(0, firstHyphenIndex) as RoomChipGroupBaseKeys;
        const actualRoomId = groupNameComposite.substring(firstHyphenIndex + 1);

        setFormData(prev => ({
            ...prev,
            rooms: prev.rooms.map(room => {
                if (room.id === actualRoomId) {
                    const currentGroupState = (room[fieldName] || {}) as Record<string, boolean>;
                    
                    // Create updated state with toggled value
                    const updatedGroupState = {
                        ...currentGroupState,
                        [key]: !currentGroupState[key]
                    };
                    
                    // Special handling for kitchenCabinetSize to ensure type safety
                    if (fieldName === 'kitchenCabinetSize') {
                        const safeKitchenCabinetSize: Room['kitchenCabinetSize'] = {
                            s30inch: false,
                            s36inch: false,
                            s42inch: false,
                            custom: false,
                            other: false,
                            ...updatedGroupState
                        };
                        
                        // If 'other' cabinet size is deselected, clear the 'other specify' field
                        if (key === 'other' && !updatedGroupState.other) {
                            return { ...room, [fieldName]: safeKitchenCabinetSize, kitchenCabinetSizeOther: '' };
                        }
                        return { ...room, [fieldName]: safeKitchenCabinetSize };
                    }
                    
                    // For other fields like kitchenRangeType
                    return { ...room, [fieldName]: updatedGroupState };
                }
                return room;
            })
        }));

    } else {
        // Handles root level chip groups
        setFormData(prev => {
          const group = prev[groupNameComposite as FormChipGroupKeys] as Record<string, boolean>;
          return { ...prev, [groupNameComposite as FormChipGroupKeys]: { ...group, [key]: !group[key], } };
        });
    }
  };

   // Adds a new room object to the rooms array in formData
   const addRoom = () => {
    setFormData(prev => ({ ...prev, rooms: [ ...prev.rooms,
        { id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, 
          roomType: 'Living Room', customRoomName: '', lengthFt: '', widthFt: '',
          floorLevel: '',
          fan: 'N/A', washerDryerHookups: 'N/A', walkInCloset: 'N/A_WC',
          kitchenIsland: false, kitchenRaisedBar: false, kitchenEatIn: false, kitchenCountertop: '',
          kitchenWalkInPantry: false, kitchenTileBacksplash: false, kitchenButlersPantry: false,
          kitchenCabinetSize: { s30inch: false, s36inch: false, s42inch: false, custom: false, other: false }, kitchenCabinetSizeOther: '',
          kitchenAppliancesColor: '', kitchenFridgeIncluded: 'No', kitchenFridgeColor: '',
          kitchenMicrowaveType: '', kitchenDishwasherIncluded: 'No', kitchenDishwasherColor: '',
          kitchenDisposal: 'No', kitchenCompactor: false, kitchenWineCooler: false,
          kitchenRangeType: { gasSingleOven: false, gasDoubleOven: false, electricSingleOven: false, electricDoubleOven: false, dualFuelSingleOven: false, dualFuelDoubleOven: false, cooktopOnly: false, wallOvenOnly: false, other: false },
          kitchenCooktopFuel: '', kitchenCooktopStyle: '', kitchenVentHoodType: '', kitchenOutdoorGrill: false,
          garageSpaces: '0', garageLengthFt: '', garageWidthFt: '', garageDoorOpeners: '0',
          garageIsAttached: 'N/A', garageIsFinished: 'N/A', garageHasStorage: false, garageHasWorkshop: false,
          primaryBathGardenTub: false, primaryBathJets: false, primaryBathWalkInShower: false, primaryBathSeparateVanities: false,
          featuresNotes: '',
        },],}));};

  // Handles changes for any field within a specific room
  const handleRoomFieldChange = (roomId: string, fieldName: keyof Room, value: string | number | boolean | Record<string, boolean>) => {
    setFormData(prev => {
      // Special handling for kitchenCabinetSize to ensure it always has the correct structure
      if (fieldName === 'kitchenCabinetSize' && typeof value === 'object') {
        const safeKitchenCabinetSize: Room['kitchenCabinetSize'] = {
          s30inch: false,
          s36inch: false,
          s42inch: false,
          custom: false,
          other: false,
          ...value // Spread the incoming values, but only after ensuring defaults
        };
        
        return {
          ...prev,
          rooms: prev.rooms.map(room => 
            room.id === roomId 
              ? { ...room, [fieldName]: safeKitchenCabinetSize } 
              : room
          )
        };
      }
      
      // For other fields, update normally
      return { 
        ...prev, 
        rooms: prev.rooms.map(room => 
          room.id === roomId 
            ? { ...room, [fieldName]: value } 
            : room
        )
      };
    });
  };

  // Removes a room from the rooms array by its ID
  const removeRoom = (roomId: string) => { setFormData(prev => ({ ...prev, rooms: prev.rooms.filter(room => room.id !== roomId) })); };

  // Adds a new patio object to the patios array
  const addPatio = () => { setFormData(prev => ({ ...prev, patios: [ ...prev.patios, { id: `patio-${Date.now()}`, lengthFt: '', widthFt: '', isCovered: false, isUncovered: false, isConcrete: false, isPavers: false, isGravel: false } ] })); };

  // Handles changes for fields within a specific patio
  const handlePatioChange = (patioId: string, fieldName: keyof Omit<Patio, 'id'>, value: string | boolean) => {
    setFormData(prev => ({ ...prev, patios: prev.patios.map(p => p.id === patioId ? { ...p, [fieldName]: value } : p) }));
  };

  // Removes a patio from the patios array by its ID
  const removePatio = (patioId: string) => { setFormData(prev => ({ ...prev, patios: prev.patios.filter(p => p.id !== patioId) })); };

  // Adds a new shed object to the sheds array
  const addShed = () => { setFormData(prev => ({ ...prev, sheds: [...prev.sheds, { id: `shed-${Date.now()}`, lengthFt: '', widthFt: '' }] })); };

  // Handles changes for fields within a specific shed
  const handleShedChange = (shedId: string, fieldName: keyof Omit<Shed, 'id'>, value: string) => {
    setFormData(prev => ({ ...prev, sheds: prev.sheds.map(s => s.id === shedId ? { ...s, [fieldName]: value } : s) }));
  };

  // Removes a shed from the sheds array by its ID
  const removeShed = (shedId: string) => { setFormData(prev => ({ ...prev, sheds: prev.sheds.filter(s => s.id !== shedId) })); };

  // Navigates to the next step in the form
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 7));
  // Navigates to the previous step in the form
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Handles form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSubmissionStatus('Submitting...');

    const finalDataToSend = {
      ...formData,
      submissionTimestamp: new Date().toISOString(),
      submissionId: crypto.randomUUID(),
      formVersion: '1.0',
    };
    
    console.log("Final Form Data:", JSON.stringify(finalDataToSend, null, 2)); 

    const n8nWebhookUrl = "https://goodhelpai-n8n.onrender.com/webhook-test/c757d1e2-886c-4523-a36e-22b782567ad2";

    if (!n8nWebhookUrl || n8nWebhookUrl === 'YOUR_N8N_WEBHOOK_URL_PLACEHOLDER') { 
      alert("WEBHOOK URL NOT SET! This is unexpected or needs configuration.");
      setSubmissionStatus('Error: Webhook URL missing.');
      return;
    }

    try {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(finalDataToSend)
      });
      if (response.ok) {
        await response.json(); 
        setSubmissionStatus('Form submitted successfully!');
        alert('Success! Form data submitted.'); 
      } else {
        const errorText = await response.text();
        setSubmissionStatus(`Error: ${response.status} ${response.statusText}. ${errorText}`);
        alert(`Submit Error: ${response.status} ${errorText}`); 
      }
    } catch (error: any) {
      setSubmissionStatus(`An error occurred: ${error.message}`);
      alert(`Error: ${error.message}`); 
    }
  };

  const neubrutalismBaseInputClasses = "mt-1 block w-full border-2 border-black p-3 shadow-[2px_2px_0px_#000000] focus:ring-4 focus:ring-black focus:ring-offset-0 focus:border-black focus:outline-none sm:text-sm bg-white text-black placeholder-neutral-400";

  const renderInput = (name: keyof FormData, label: string, type = 'text', placeholder = '', isConditional = false, condition?: boolean) => {
    if (isConditional && !condition && name !== 'acTypeOther') return null; 
    return (
      <div className={`mb-4 ${isConditional && !condition && name !== 'acTypeOther' ? 'hidden' : ''}`}>
        <label htmlFor={name as string} className="block text-sm font-bold text-black mb-1">{label}</label>
        <input
          type={type}
          name={name as string}
          id={name as string}
          value={String(formData[name] ?? '')}
          onChange={handleChange}
          placeholder={placeholder}
          className={neubrutalismBaseInputClasses}
          {...(type === 'number' && { inputMode: 'decimal' })}
        />
      </div>
    );
  };

  const renderTextarea = (name: keyof FormData, label: string, placeholder = '', rows = 3) => (
    <div className="mb-4">
      <label htmlFor={name as string} className="block text-sm font-bold text-black mb-1">{label}</label>
      <textarea
        name={name as string}
        id={name as string}
        value={String(formData[name] ?? '')}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={neubrutalismBaseInputClasses}
      />
    </div>
  );

  const renderSelect = (name: keyof FormData, label: string, options: readonly string[] | readonly {value: string, label: string}[], isConditional = false, condition?: boolean, currentVal?: string) => {
    if (isConditional && !condition) return null; 
    const valueToUse = currentVal !== undefined ? currentVal : String(formData[name] ?? '');
    return (
      <div className={`mb-4 ${isConditional && !condition ? 'hidden' : ''}`}>
        <label htmlFor={name as string} className="block text-sm font-bold text-black mb-1">{label}</label>
        <select
          name={name as string}
          id={name as string}
          value={valueToUse}
          onChange={handleChange}
          className={neubrutalismBaseInputClasses}
        >
          <option value="">Select {label}</option>
          {options.map(opt =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>{opt}</option>
            ) : (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )
          )}
        </select>
      </div>
    );
  };

  const renderRadioGroup = (
    nameComposite: keyof FormData | `kitchenFridgeIncluded-${string}` | `kitchenFridgeColor-${string}`, 
    label: string,
    options: Array<{label: string, value: string}>,
    isConditional = false,
    condition?: boolean,
    roomId?: string 
  ) => {
    if (isConditional && !condition) return null; 

    let currentRadioValue = '';
    if (roomId) {
        const room = formData.rooms.find(r => r.id === roomId);
        const firstHyphenIndex = (nameComposite as string).indexOf('-');
        const baseFieldName = (nameComposite as string).substring(0, firstHyphenIndex);
        const fieldKey = baseFieldName as keyof Room; 
        if (room && fieldKey in room) {
            currentRadioValue = String((room as any)[fieldKey] ?? '');
        } else if (room) {
            currentRadioValue = ''; 
        }
    } else {
        currentRadioValue = String(formData[nameComposite as keyof FormData] ?? '');
    }

    return (
      <div className={`mb-4 ${isConditional && !condition ? 'hidden' : ''}`}>
        <span className="block text-sm font-bold text-black mb-1">{label}</span>
        <div className="mt-2 space-x-0 sm:space-x-4 flex flex-col sm:flex-row sm:flex-wrap">
          {options.map(opt => (
            <label key={opt.value} className="inline-flex items-center mr-0 sm:mr-4 mb-2 cursor-pointer">
              <input
                type="radio"
                name={nameComposite as string}
                value={opt.value}
                checked={currentRadioValue === opt.value}
                onChange={(e) => handleRadioChange(nameComposite, e.target.value)}
                className="sr-only custom-radio-input" 
              />
              <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                {currentRadioValue === opt.value && <span className="w-2.5 h-2.5 bg-black"></span>} 
              </span>
              <span className="text-black text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderCheckbox = (name: string, label: string, isChecked: boolean, onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void, parentId?: string) => {
    const id = parentId ? `${name}-${parentId}` : name; 
    return (
        <label htmlFor={id} className="flex items-center space-x-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              id={id}
              name={name}
              checked={isChecked}
              onChange={onChangeCallback}
              className="sr-only custom-checkbox-input" 
            />
            <span className="custom-checkbox-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                {isChecked && <span className="w-2.5 h-2.5 bg-black"></span>} 
            </span>
            <span className="text-sm font-medium text-black">{label}</span>
        </label>
    );
  };

  const renderChipGroup = (
    groupNameComposite: ChipGroupCompositeKeys, 
    label: string,
    options: Record<string, string>,
    currentChipStateParam?: Record<string, boolean>, 
    roomId?: string 
  ) => {
    let stateToUse: Record<string, boolean> = {};
    if (roomId && currentChipStateParam) {
        stateToUse = currentChipStateParam;
    } else if (!roomId && formData[groupNameComposite as FormChipGroupKeys]) {
        stateToUse = formData[groupNameComposite as FormChipGroupKeys] as Record<string, boolean>;
    }

    return (
    <div className="mb-4">
      <span className="block text-sm font-bold text-black mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {Object.entries(options).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => handleChipToggle(groupNameComposite, key)}
            className={`px-3 py-2 text-xs font-medium border-2 border-black shadow-[2px_2px_0px_#000000] transition-colors duration-200 ease-in-out ${
              stateToUse[key] ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-neutral-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )};

  const renderRoomInput = (roomId: string, fieldName: keyof Room, label: string, type = 'text', placeholder = '', currentValue: string | number) => (
    <div className="md:col-span-1 mb-4"> {/* Added mb-4 for consistent spacing */}
      <label htmlFor={`${fieldName}-${roomId}`} className="block text-sm font-bold text-black mb-1">{label}</label>
      <input
        type={type}
        id={`${fieldName}-${roomId}`}
        name={fieldName as string}
        value={currentValue}
        placeholder={placeholder}
        onChange={(e) => handleRoomFieldChange(roomId, fieldName, type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)}
        className={neubrutalismBaseInputClasses}
        {...(type === 'number' && { inputMode: 'decimal' })}
      />
    </div>
  );

  const renderRoomCheckbox = (roomId: string, fieldName: keyof Room, label: string, currentValue: boolean) => (
     <label className="flex items-center space-x-2 col-span-1 py-2 cursor-pointer mb-2"> {/* Added mb-2 for a bit of space if stacked */}
        <input
          type="checkbox"
          checked={currentValue}
          onChange={(e) => handleRoomFieldChange(roomId, fieldName, e.target.checked)}
          className="sr-only custom-checkbox-input"
        />
        <span className="custom-checkbox-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
            {currentValue && <span className="w-2.5 h-2.5 bg-black"></span>}
        </span>
        <span className="text-sm font-medium text-black">{label}</span>
    </label>
  );

  const renderRoomTextarea = (roomId: string, fieldName: keyof Room, label: string, currentValue: string) => (
    <div className="md:col-span-2 mb-4"> {/* Added mb-4 for consistent spacing */}
        <label htmlFor={`${fieldName}-${roomId}`} className="block text-sm font-bold text-black mb-1">{label}</label>
        <textarea
          id={`${fieldName}-${roomId}`}
          name={fieldName as string}
          value={currentValue}
          onChange={(e) => handleRoomFieldChange(roomId, fieldName, e.target.value)}
          rows={3}
          className={neubrutalismBaseInputClasses}
        />
    </div>
  );


  return (
    <div className="bg-yellow-100 min-h-screen p-4 sm:p-8 flex flex-col items-center font-['Inter',_sans-serif]">
      <div className="w-full max-w-3xl">
        <header className="bg-blue-600 text-white p-6 shadow-hard-black border-4 border-black mb-8 rounded-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Cudd Realty Measurement Form</h1>
          <p className="text-center text-sm sm:text-base mt-1">Step {currentStep} of 7</p>
          <div className="mt-4 bg-neutral-300 border-2 border-black h-6 rounded-none">
            <div
              className="bg-green-500 h-full border-r-2 border-black transition-all duration-300 ease-in-out rounded-none"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border-4 border-black shadow-hard-black space-y-6 rounded-none">
          {currentStep === 1 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 1: Basic Information</h2>
              {renderInput('streetAddress', 'Street Address', 'text', '123 Main St')}
              {renderInput('city', 'City', 'text', 'Anytown')}
              {renderSelect('state', 'State', usStates, false, undefined, formData.state)}
              {renderInput('zipCode', 'Zip Code', 'text', '12345')}
              {renderSelect('propertyType', 'Property Type', propertyTypes, false, undefined, formData.propertyType)}
            </section>
          )}

          {currentStep === 2 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 2: Property Details</h2>
              <div className="mb-4">
                <label htmlFor="totalBedrooms" className="block text-sm font-bold text-black mb-1">Total Bedrooms: {formData.totalBedrooms}</label>
                <input type="range" min="0" max="10" step="1" name="totalBedrooms" id="totalBedrooms" value={formData.totalBedrooms} onChange={(e) => handleSliderChange('totalBedrooms', e.target.value)} className="w-full h-3 bg-neutral-300 appearance-none cursor-pointer border-2 border-black focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-0 rounded-none" />
              </div>
              <div className="mb-4">
                <label htmlFor="totalBathrooms" className="block text-sm font-bold text-black mb-1">Total Bathrooms: {formData.totalBathrooms}</label>
                <input type="range" min="0" max="10" step="0.5" name="totalBathrooms" id="totalBathrooms" value={formData.totalBathrooms} onChange={(e) => handleSliderChange('totalBathrooms', e.target.value)} className="w-full h-3 bg-neutral-300 appearance-none cursor-pointer border-2 border-black focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-0 rounded-none" />
              </div>
              {renderChipGroup('exteriorFeatures', 'Exterior Features', exteriorFeatureOptions)}
              {renderRadioGroup('hoa', 'HOA', yesNoOptions)}
              {renderInput('monthlyHoaDues', 'Monthly HOA Dues ($)', 'number', 'e.g., 150', true, formData.hoa === 'Yes')}
            </section>
          )}

          {currentStep === 3 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 3: Room Specifications</h2>
              {formData.rooms.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-black">
                  <p className="text-neutral-600 mb-4">No rooms added yet. Click below to add the first room.</p>
                  <button type="button" onClick={addRoom} className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 text-lg">
                    Add First Room
                  </button>
                </div>
              ) : (
                <>
                  {formData.rooms.map((room, index) => (
                    <div key={room.id} className="mb-6 p-4 border-2 border-black shadow-[6px_6px_0px_#000000] relative rounded-none bg-white">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-bold text-black">
                          {room.roomType === 'Other' && room.customRoomName ? room.customRoomName : room.roomType}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeRoom(room.id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                          aria-label="Remove room"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 mb-4">
                          <label htmlFor={`roomType-${room.id}`} className="block text-sm font-bold text-black mb-1">Room Type</label>
                          <select
                            id={`roomType-${room.id}`}
                            value={room.roomType}
                            onChange={(e) => handleRoomFieldChange(room.id, 'roomType', e.target.value)}
                            className={neubrutalismBaseInputClasses}
                          >
                            {roomTypeDetails.map(rt => (
                              <option key={rt.value} value={rt.value}>{rt.label}</option>
                            ))}
                          </select>
                        </div>

                        {room.roomType === 'Other' && (
                          <div className="md:col-span-2 mb-4">
                            <label htmlFor={`customRoomName-${room.id}`} className="block text-sm font-bold text-black mb-1">Custom Room Name</label>
                            <input
                              type="text"
                              id={`customRoomName-${room.id}`}
                              value={room.customRoomName}
                              onChange={(e) => handleRoomFieldChange(room.id, 'customRoomName', e.target.value)}
                              placeholder="e.g., Craft Room, Home Gym, etc."
                              className={neubrutalismBaseInputClasses}
                            />
                          </div>
                        )}

                        {renderRoomInput(room.id, 'lengthFt', 'Length (ft)', 'text', 'e.g., 12', room.lengthFt)}
                        {renderRoomInput(room.id, 'widthFt', 'Width (ft)', 'text', 'e.g., 10', room.widthFt)}

                        <div className="md:col-span-2 mb-4">
                          <label htmlFor={`floorLevel-${room.id}`} className="block text-sm font-bold text-black mb-1">Floor Level</label>
                          <select
                            id={`floorLevel-${room.id}`}
                            value={room.floorLevel || ''}
                            onChange={(e) => handleRoomFieldChange(room.id, 'floorLevel', e.target.value as FloorLevelType)}
                            className={neubrutalismBaseInputClasses}
                          >
                            <option value="">Select Floor Level</option>
                            {floorLevelOptions.filter(o => o !== '').map(fl => (
                              <option key={fl} value={fl}>{fl}</option>
                            ))}
                          </select>
                        </div>

                        {/* Conditionally render fields based on room type */}
                        {room.roomType === 'Kitchen' && (
                          <>
                            <div className="md:col-span-2 border-t-2 border-black pt-4 mt-2 mb-4">
                              <h4 className="font-bold text-black mb-3">Kitchen Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {renderRoomCheckbox(room.id, 'kitchenIsland', 'Island', room.kitchenIsland)}
                                {renderRoomCheckbox(room.id, 'kitchenRaisedBar', 'Raised Bar', room.kitchenRaisedBar)}
                                {renderRoomCheckbox(room.id, 'kitchenEatIn', 'Eat-In', room.kitchenEatIn)}
                                {renderRoomCheckbox(room.id, 'kitchenWalkInPantry', 'Walk-In Pantry', room.kitchenWalkInPantry)}
                                {renderRoomCheckbox(room.id, 'kitchenTileBacksplash', 'Tile Backsplash', room.kitchenTileBacksplash)}
                                {renderRoomCheckbox(room.id, 'kitchenButlersPantry', 'Butler\'s Pantry', room.kitchenButlersPantry)}
                              </div>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenCountertop-${room.id}`} className="block text-sm font-bold text-black mb-1">Countertop Material</label>
                              <select
                                id={`kitchenCountertop-${room.id}`}
                                value={room.kitchenCountertop}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenCountertop', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Countertop Material</option>
                                {kitchenCountertopOptions.filter(o => o !== '').map(ct => (
                                  <option key={ct} value={ct}>{ct}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <span className="block text-sm font-bold text-black mb-2">Cabinet Size</span>
                              {renderChipGroup(`kitchenCabinetSize-${room.id}`, '', kitchenCabinetSizeChipOptions, room.kitchenCabinetSize, room.id)}
                              
                              {room.kitchenCabinetSize.other && (
                                <div className="mt-2">
                                  <label htmlFor={`kitchenCabinetSizeOther-${room.id}`} className="block text-sm font-bold text-black mb-1">Specify Other Cabinet Size</label>
                                  <input
                                    type="text"
                                    id={`kitchenCabinetSizeOther-${room.id}`}
                                    value={room.kitchenCabinetSizeOther}
                                    onChange={(e) => handleRoomFieldChange(room.id, 'kitchenCabinetSizeOther', e.target.value)}
                                    placeholder="e.g., Custom height, special dimensions, etc."
                                    className={neubrutalismBaseInputClasses}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenAppliancesColor-${room.id}`} className="block text-sm font-bold text-black mb-1">Appliances Color</label>
                              <select
                                id={`kitchenAppliancesColor-${room.id}`}
                                value={room.kitchenAppliancesColor}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenAppliancesColor', e.target.value as KitchenApplianceColorType)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Appliances Color</option>
                                {kitchenApplianceColorOptions.filter(o => o !== '').map(ac => (
                                  <option key={ac} value={ac}>{ac}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <span className="block text-sm font-bold text-black mb-1">Refrigerator Included</span>
                              <div className="mt-2 space-x-0 sm:space-x-4 flex flex-col sm:flex-row">
                                {yesNoOptions.map(opt => (
                                  <label key={opt.value} className="inline-flex items-center mr-0 sm:mr-4 mb-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`kitchenFridgeIncluded-${room.id}`}
                                      value={opt.value}
                                      checked={room.kitchenFridgeIncluded === opt.value}
                                      onChange={(e) => handleRadioChange(`kitchenFridgeIncluded-${room.id}`, e.target.value)}
                                      className="sr-only custom-radio-input"
                                    />
                                    <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                                      {room.kitchenFridgeIncluded === opt.value && <span className="w-2.5 h-2.5 bg-black"></span>}
                                    </span>
                                    <span className="text-black text-sm">{opt.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {room.kitchenFridgeIncluded === 'Yes' && (
                              <div className="md:col-span-2 mb-4">
                                <span className="block text-sm font-bold text-black mb-1">Refrigerator Color</span>
                                <div className="mt-2 space-x-0 sm:space-x-4 flex flex-col sm:flex-row">
                                  {kitchenFridgeColorOptions.map(opt => (
                                    <label key={opt.value} className="inline-flex items-center mr-0 sm:mr-4 mb-2 cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`kitchenFridgeColor-${room.id}`}
                                        value={opt.value}
                                        checked={room.kitchenFridgeColor === opt.value}
                                        onChange={(e) => handleRadioChange(`kitchenFridgeColor-${room.id}`, e.target.value)}
                                        className="sr-only custom-radio-input"
                                      />
                                      <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                                        {room.kitchenFridgeColor === opt.value && <span className="w-2.5 h-2.5 bg-black"></span>}
                                      </span>
                                      <span className="text-black text-sm">{opt.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenMicrowaveType-${room.id}`} className="block text-sm font-bold text-black mb-1">Microwave Type</label>
                              <select
                                id={`kitchenMicrowaveType-${room.id}`}
                                value={room.kitchenMicrowaveType}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenMicrowaveType', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Microwave Type</option>
                                {kitchenMicrowaveTypeOptions.filter(o => o !== '').map(mt => (
                                  <option key={mt} value={mt}>{mt}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <span className="block text-sm font-bold text-black mb-1">Dishwasher Included</span>
                              <div className="mt-2 space-x-0 sm:space-x-4 flex flex-col sm:flex-row">
                                {yesNoNegotiableOptions.map(opt => (
                                  <label key={opt} className="inline-flex items-center mr-0 sm:mr-4 mb-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`kitchenDishwasherIncluded-${room.id}`}
                                      value={opt}
                                      checked={room.kitchenDishwasherIncluded === opt}
                                      onChange={(e) => handleRoomFieldChange(room.id, 'kitchenDishwasherIncluded', e.target.value)}
                                      className="sr-only custom-radio-input"
                                    />
                                    <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                                      {room.kitchenDishwasherIncluded === opt && <span className="w-2.5 h-2.5 bg-black"></span>}
                                    </span>
                                    <span className="text-black text-sm">{opt}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <span className="block text-sm font-bold text-black mb-1">Disposal</span>
                              <div className="mt-2 space-x-0 sm:space-x-4 flex flex-col sm:flex-row">
                                {yesNoOptions.map(opt => (
                                  <label key={opt.value} className="inline-flex items-center mr-0 sm:mr-4 mb-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`kitchenDisposal-${room.id}`}
                                      value={opt.value}
                                      checked={room.kitchenDisposal === opt.value}
                                      onChange={(e) => handleRoomFieldChange(room.id, 'kitchenDisposal', e.target.value)}
                                      className="sr-only custom-radio-input"
                                    />
                                    <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                                      {room.kitchenDisposal === opt.value && <span className="w-2.5 h-2.5 bg-black"></span>}
                                    </span>
                                    <span className="text-black text-sm">{opt.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                              {renderRoomCheckbox(room.id, 'kitchenCompactor', 'Compactor', room.kitchenCompactor)}
                              {renderRoomCheckbox(room.id, 'kitchenWineCooler', 'Wine Cooler', room.kitchenWineCooler)}
                              {renderRoomCheckbox(room.id, 'kitchenOutdoorGrill', 'Outdoor Grill', room.kitchenOutdoorGrill)}
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <span className="block text-sm font-bold text-black mb-2">Range Type</span>
                              {renderChipGroup(`kitchenRangeType-${room.id}`, '', kitchenRangeTypeChipOptions, room.kitchenRangeType, room.id)}
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenCooktopFuel-${room.id}`} className="block text-sm font-bold text-black mb-1">Cooktop Fuel</label>
                              <select
                                id={`kitchenCooktopFuel-${room.id}`}
                                value={room.kitchenCooktopFuel}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenCooktopFuel', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Cooktop Fuel</option>
                                {kitchenCooktopFuelOptions.filter(o => o !== '').map(cf => (
                                  <option key={cf} value={cf}>{cf}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenCooktopStyle-${room.id}`} className="block text-sm font-bold text-black mb-1">Cooktop Style</label>
                              <select
                                id={`kitchenCooktopStyle-${room.id}`}
                                value={room.kitchenCooktopStyle}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenCooktopStyle', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Cooktop Style</option>
                                {kitchenCooktopStyleOptions.filter(o => o !== '').map(cs => (
                                  <option key={cs} value={cs}>{cs}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 mb-4">
                              <label htmlFor={`kitchenVentHoodType-${room.id}`} className="block text-sm font-bold text-black mb-1">Vent Hood Type</label>
                              <select
                                id={`kitchenVentHoodType-${room.id}`}
                                value={room.kitchenVentHoodType}
                                onChange={(e) => handleRoomFieldChange(room.id, 'kitchenVentHoodType', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                <option value="">Select Vent Hood Type</option>
                                {kitchenVentHoodTypeOptions.filter(o => o !== '').map(vh => (
                                  <option key={vh} value={vh}>{vh}</option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {room.roomType === 'Garage' && (
                          <>
                            <div className="md:col-span-2 border-t-2 border-black pt-4 mt-2 mb-4">
                              <h4 className="font-bold text-black mb-3">Garage Features</h4>
                            </div>

                            <div className="md:col-span-1 mb-4">
                              <label htmlFor={`garageSpaces-${room.id}`} className="block text-sm font-bold text-black mb-1">Garage Spaces</label>
                              <select
                                id={`garageSpaces-${room.id}`}
                                value={room.garageSpaces}
                                onChange={(e) => handleRoomFieldChange(room.id, 'garageSpaces', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                {garageSpaceOptions.map(gs => (
                                  <option key={gs} value={gs}>{gs}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-1 mb-4">
                              <label htmlFor={`garageDoorOpeners-${room.id}`} className="block text-sm font-bold text-black mb-1">Door Openers</label>
                              <select
                                id={`garageDoorOpeners-${room.id}`}
                                value={room.garageDoorOpeners}
                                onChange={(e) => handleRoomFieldChange(room.id, 'garageDoorOpeners', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                {garageDoorOpenerOptions.map(gdo => (
                                  <option key={gdo} value={gdo}>{gdo}</option>
                                ))}
                              </select>
                            </div>

                            {renderRoomInput(room.id, 'garageLengthFt', 'Length (ft)', 'text', 'e.g., 20', room.garageLengthFt)}
                            {renderRoomInput(room.id, 'garageWidthFt', 'Width (ft)', 'text', 'e.g., 20', room.garageWidthFt)}

                            <div className="md:col-span-1 mb-4">
                              <label htmlFor={`garageIsAttached-${room.id}`} className="block text-sm font-bold text-black mb-1">Is Attached</label>
                              <select
                                id={`garageIsAttached-${room.id}`}
                                value={room.garageIsAttached}
                                onChange={(e) => handleRoomFieldChange(room.id, 'garageIsAttached', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                {yesNoNaOptions.map(yn => (
                                  <option key={yn} value={yn}>{yn}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-1 mb-4">
                              <label htmlFor={`garageIsFinished-${room.id}`} className="block text-sm font-bold text-black mb-1">Is Finished</label>
                              <select
                                id={`garageIsFinished-${room.id}`}
                                value={room.garageIsFinished}
                                onChange={(e) => handleRoomFieldChange(room.id, 'garageIsFinished', e.target.value)}
                                className={neubrutalismBaseInputClasses}
                              >
                                {yesNoNaOptions.map(yn => (
                                  <option key={yn} value={yn}>{yn}</option>
                                ))}
                              </select>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                              {renderRoomCheckbox(room.id, 'garageHasStorage', 'Has Storage', room.garageHasStorage)}
                              {renderRoomCheckbox(room.id, 'garageHasWorkshop', 'Has Workshop', room.garageHasWorkshop)}
                            </div>
                          </>
                        )}

                        {room.roomType === 'Primary Bedroom' && (
                          <>
                            <div className="md:col-span-2 border-t-2 border-black pt-4 mt-2 mb-4">
                              <h4 className="font-bold text-black mb-3">Primary Bedroom Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="md:col-span-1">
                                  <label className="block text-sm font-bold text-black mb-1">Fan</label>
                                  <select
                                    value={room.fan}
                                    onChange={(e) => handleRoomFieldChange(room.id, 'fan', e.target.value)}
                                    className={neubrutalismBaseInputClasses}
                                  >
                                    {yesNoNaOptions.map(yn => (
                                      <option key={yn} value={yn}>{yn}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="md:col-span-1">
                                  <label className="block text-sm font-bold text-black mb-1">Walk-In Closet</label>
                                  <select
                                    value={room.walkInCloset}
                                    onChange={(e) => handleRoomFieldChange(room.id, 'walkInCloset', e.target.value)}
                                    className={neubrutalismBaseInputClasses}
                                  >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="N/A_WC">N/A</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {room.roomType === 'Bathroom' && (
                          <>
                            <div className="md:col-span-2 border-t-2 border-black pt-4 mt-2 mb-4">
                              <h4 className="font-bold text-black mb-3">Bathroom Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {renderRoomCheckbox(room.id, 'primaryBathGardenTub', 'Garden Tub', room.primaryBathGardenTub || false)}
                                {renderRoomCheckbox(room.id, 'primaryBathJets', 'Jets', room.primaryBathJets || false)}
                                {renderRoomCheckbox(room.id, 'primaryBathWalkInShower', 'Walk-In Shower', room.primaryBathWalkInShower || false)}
                                {renderRoomCheckbox(room.id, 'primaryBathSeparateVanities', 'Separate Vanities', room.primaryBathSeparateVanities || false)}
                              </div>
                            </div>
                          </>
                        )}

                        {room.roomType === 'Utility Room' && (
                          <>
                            <div className="md:col-span-2 border-t-2 border-black pt-4 mt-2 mb-4">
                              <h4 className="font-bold text-black mb-3">Utility Room Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                                <div className="md:col-span-1">
                                  <label className="block text-sm font-bold text-black mb-1">Washer/Dryer Hookups</label>
                                  <select
                                    value={room.washerDryerHookups}
                                    onChange={(e) => handleRoomFieldChange(room.id, 'washerDryerHookups', e.target.value)}
                                    className={neubrutalismBaseInputClasses}
                                  >
                                    {yesNoNaOptions.map(yn => (
                                      <option key={yn} value={yn}>{yn}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Notes field for all room types */}
                        {renderRoomTextarea(room.id, 'featuresNotes', 'Additional Notes', room.featuresNotes)}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={addRoom}
                      className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6"
                    >
                      Add Another Room
                    </button>
                  </div>
                </>
              )}
            </section>
          )}

          {currentStep === 4 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 4: Flooring & Features</h2>
              {renderChipGroup('flooringTypes', 'Flooring Types', flooringTypeOptions)}
              {renderInput('specifyOtherFlooringType', 'Specify Other Flooring Type', 'text', 'e.g., Bamboo, Cork, etc.')}
              {renderInput('roofType', 'Roof Type', 'text', 'e.g., Asphalt Shingle, Metal, Tile, etc.')}
              
              {renderRadioGroup('hasFireplace', 'Fireplace', yesNoOptions)}
              {formData.hasFireplace === 'Yes' && (
                <>
                  <div className="mb-4">
                    <label htmlFor="numberOfFireplaces" className="block text-sm font-bold text-black mb-1">Number of Fireplaces</label>
                    <select
                      name="numberOfFireplaces"
                      id="numberOfFireplaces"
                      value={formData.numberOfFireplaces}
                      onChange={handleChange}
                      className={neubrutalismBaseInputClasses}
                    >
                      {fireplaceNumberOptions.map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <span className="block text-sm font-bold text-black mb-2">Fireplace Features</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries({
                        wood: 'Wood Burning',
                        gas: 'Gas',
                        gasLogs: 'Gas Logs',
                        electricStarter: 'Electric Starter',
                        vaultedCeilingsNearFP: 'Vaulted Ceilings',
                        programmableThermostatFP: 'Programmable Thermostat'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center space-x-2 py-1 cursor-pointer">
                          <input
                            type="checkbox"
                            name={`fireplaceFeatures.${key}`}
                            checked={formData.fireplaceFeatures[key as keyof typeof formData.fireplaceFeatures]}
                            onChange={handleChange}
                            className="sr-only custom-checkbox-input"
                          />
                          <span className="custom-checkbox-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                            {formData.fireplaceFeatures[key as keyof typeof formData.fireplaceFeatures] && <span className="w-2.5 h-2.5 bg-black"></span>}
                          </span>
                          <span className="text-sm font-medium text-black">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {renderSelect('waterHeaterType', 'Water Heater Type', waterHeaterOptions)}
              {renderSelect('acType', 'AC Type', acOptions)}
              {formData.acType === 'Other' && renderInput('acTypeOther', 'Specify Other AC Type', 'text', 'e.g., Mini-Split, etc.')}
              {renderSelect('heatType', 'Heat Type', heatOptions)}
            </section>
          )}

          {currentStep === 5 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 5: Outdoor Features</h2>
              
              {renderRadioGroup('hasPatios', 'Patios', yesNoOptions)}
              {formData.hasPatios === 'Yes' && (
                <div className="mb-6">
                  {formData.patios.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-black">
                      <p className="text-neutral-600 mb-4">No patios added yet. Click below to add the first patio.</p>
                      <button type="button" onClick={addPatio} className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4">
                        Add First Patio
                      </button>
                    </div>
                  ) : (
                    <>
                      {formData.patios.map((patio, index) => (
                        <div key={patio.id} className="mb-4 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] relative rounded-none">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-black">Patio {index + 1}</h3>
                            <button
                              type="button"
                              onClick={() => removePatio(patio.id)}
                              className="text-red-600 hover:text-red-800 font-bold"
                              aria-label="Remove patio"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-1">
                              <label className="block text-sm font-bold text-black mb-1">Length (ft)</label>
                              <input
                                type="text"
                                value={patio.lengthFt}
                                onChange={(e) => handlePatioChange(patio.id, 'lengthFt', e.target.value)}
                                placeholder="e.g., 10"
                                className={neubrutalismBaseInputClasses}
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-sm font-bold text-black mb-1">Width (ft)</label>
                              <input
                                type="text"
                                value={patio.widthFt}
                                onChange={(e) => handlePatioChange(patio.id, 'widthFt', e.target.value)}
                                placeholder="e.g., 12"
                                className={neubrutalismBaseInputClasses}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <span className="block text-sm font-bold text-black mb-2">Patio Features</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {[
                                  { key: 'isCovered', label: 'Covered' },
                                  { key: 'isUncovered', label: 'Uncovered' },
                                  { key: 'isConcrete', label: 'Concrete' },
                                  { key: 'isPavers', label: 'Pavers' },
                                  { key: 'isGravel', label: 'Gravel' }
                                ].map(({ key, label }) => (
                                  <label key={key} className="flex items-center space-x-2 py-1 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={(patio as any)[key]}
                                      onChange={(e) => handlePatioChange(patio.id, key as keyof Omit<Patio, 'id'>, e.target.checked)}
                                      className="sr-only custom-checkbox-input"
                                    />
                                    <span className="custom-checkbox-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                                      {(patio as any)[key] && <span className="w-2.5 h-2.5 bg-black"></span>}
                                    </span>
                                    <span className="text-sm font-medium text-black">{label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-center mt-4">
                        <button
                          type="button"
                          onClick={addPatio}
                          className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4"
                        >
                          Add Another Patio
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {renderRadioGroup('hasSheds', 'Sheds', yesNoOptions)}
              {formData.hasSheds === 'Yes' && (
                <div className="mb-6">
                  {formData.sheds.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-black">
                      <p className="text-neutral-600 mb-4">No sheds added yet. Click below to add the first shed.</p>
                      <button type="button" onClick={addShed} className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4">
                        Add First Shed
                      </button>
                    </div>
                  ) : (
                    <>
                      {formData.sheds.map((shed, index) => (
                        <div key={shed.id} className="mb-4 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] relative rounded-none">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-black">Shed {index + 1}</h3>
                            <button
                              type="button"
                              onClick={() => removeShed(shed.id)}
                              className="text-red-600 hover:text-red-800 font-bold"
                              aria-label="Remove shed"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-1">
                              <label className="block text-sm font-bold text-black mb-1">Length (ft)</label>
                              <input
                                type="text"
                                value={shed.lengthFt}
                                onChange={(e) => handleShedChange(shed.id, 'lengthFt', e.target.value)}
                                placeholder="e.g., 8"
                                className={neubrutalismBaseInputClasses}
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="block text-sm font-bold text-black mb-1">Width (ft)</label>
                              <input
                                type="text"
                                value={shed.widthFt}
                                onChange={(e) => handleShedChange(shed.id, 'widthFt', e.target.value)}
                                placeholder="e.g., 10"
                                className={neubrutalismBaseInputClasses}
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-center mt-4">
                        <button
                          type="button"
                          onClick={addShed}
                          className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4"
                        >
                          Add Another Shed
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {renderRadioGroup('pool', 'Pool', yesNoOptions)}
              {renderRadioGroup('hotTubSpa', 'Hot Tub/Spa', yesNoOptions)}
              {renderRadioGroup('sprinklerSystem', 'Sprinkler System', yesNoOptions)}
              {renderRadioGroup('alarmSystem', 'Alarm System', yesNoOptions)}
              
              <div className="mb-4">
                <label htmlFor="numberOfSmokeDetectors" className="block text-sm font-bold text-black mb-1">Number of Smoke Detectors</label>
                <select
                  name="numberOfSmokeDetectors"
                  id="numberOfSmokeDetectors"
                  value={formData.numberOfSmokeDetectors}
                  onChange={handleChange}
                  className={neubrutalismBaseInputClasses}
                >
                  <option value="">Select Number</option>
                  {smokeDetectorNumberOptions.map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </section>
          )}

          {currentStep === 6 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 6: Lot & Community</h2>
              
              {renderInput('lotNumber', 'Lot Number', 'text', 'e.g., 123')}
              
              {renderChipGroup('yardFeatures', 'Yard Features', {
                backyardGrass: 'Backyard Grass',
                someTrees: 'Some Trees',
                noTrees: 'No Trees'
              })}
              
              {renderChipGroup('communityAmenities', 'Community Amenities', {
                pool: 'Pool',
                park: 'Park',
                walkingPaths: 'Walking Paths',
                clubHouse: 'Club House',
                weightRoom: 'Weight Room',
                greenbelt: 'Greenbelt',
                playground: 'Playground',
                tennis: 'Tennis',
                pond: 'Pond'
              })}
              
              {renderRadioGroup('deck', 'Deck', yesNoOptions)}
              {renderInput('fenceHeight', 'Fence Height (ft)', 'text', 'e.g., 6')}
              
              {renderChipGroup('fenceMaterials', 'Fence Materials', {
                wood: 'Wood',
                vinyl: 'Vinyl',
                chainLink: 'Chain Link'
              })}
              
              {renderRadioGroup('programmableThermostat', 'Programmable Thermostat', yesNoOptions)}
            </section>
          )}

          {currentStep === 7 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 7: Review & Submit</h2>
              {renderTextarea('additionalPropertyDescription', 'Overall Property Description / Final Notes', 'Unique features, general notes, items not covered elsewhere, etc.', 9)}
              <p className="my-4 text-sm text-black">Please review all your entries before submitting.</p>
              <ReviewCard formData={formData} />
              {submissionStatus && (
                <p className={`mt-4 text-sm p-3 border-2 border-black rounded-none ${submissionStatus.startsWith('Error') ? 'bg-red-200 text-red-800 border-red-800' : 'bg-green-200 text-green-800 border-green-800'}`}>
                  {submissionStatus}
                </p>
              )}
            </section>
          )}
          <div className="mt-10 pt-6 border-t-2 border-black flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1 || submissionStatus === 'Submitting...'}
              className="neubrutalism-button bg-neutral-600 hover:bg-neutral-700 text-white font-bold py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={nextStep}
                className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6"
                disabled={submissionStatus === 'Submitting...'}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="neubrutalism-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6"
                disabled={submissionStatus === 'Submitting...'}
              >
                {submissionStatus === 'Submitting...' ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>
        <footer className="text-center mt-12 pb-8 text-sm text-black">
            <p>&copy; {new Date().getFullYear()} Cudd Realty. Internal Use Only.</p>
            <div className="my-2"></div> 
            <p className="font-mono text-xs">(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Made by GoodHelpAI</p>
        </footer>
      </div>
      <style jsx global>{`
        .shadow-hard-black {
           box-shadow: 8px 8px 0px #000000;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
          background-repeat: no-repeat;
          background-position: right 0.7rem center; 
          background-size: 0.65em auto; 
          padding-right: 2.5rem; 
        }
        .custom-radio-input:focus + .custom-radio-button,
        .custom-checkbox-input:focus + .custom-checkbox-button {
            outline: 3px solid black; 
            outline-offset: 2px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; 
          appearance: none;
          width: 20px; 
          height: 20px; 
          background: #0052cc; 
          border: 2px solid black; 
          cursor: pointer; 
          border-radius: 0; 
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px; 
          height: 18px; 
          background: #0052cc; 
          border: 2px solid black; 
          cursor: pointer; 
          border-radius: 0; 
        }
        button, input, select, textarea, .shadow-hard-black, .custom-radio-button, .custom-checkbox-button {
            border-radius: 0 !important; 
        }
      `}</style>
    </div>
  );
}
