
// src/app/page.tsx
// Make sure you have Next.js (App Router) and Tailwind CSS setup in your project.

'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

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
    laminateWood: boolean; // Changed
    stainedConcrete: boolean; // Changed
    linoleum: boolean; // New
    wood: boolean; // New (distinct from hardwood if needed, or can be merged)
    marble: boolean; // New
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
  submissionTimestamp: string; // Added timestamp field
}

type FormChipGroupKeys = 'flooringTypes' | 'fenceMaterials' | 'yardFeatures' | 'communityAmenities' | 'exteriorFeatures'; // Added exteriorFeatures
type RoomChipGroupBaseKeys = 'kitchenRangeType' | 'kitchenCabinetSize';
type ChipGroupCompositeKeys = FormChipGroupKeys | `${RoomChipGroupBaseKeys}-${string}`;


const initialFormData: FormData = {
  streetAddress: '', city: '', state: '', zipCode: '', propertyType: 'Single Family',
  totalBedrooms: 3, totalBathrooms: 2,
  exteriorFeatures: { brick: false, cementSiding: false, vinylSiding: false, woodSiding: false, stucco: false, gutters: false, }, // Initialized
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
  submissionTimestamp: '', // Initialized timestamp
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
  const handleSliderChange = (name: 'totalBedrooms' | 'totalBathrooms', value: string | number) => { // Allow number for direct set
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
                    const updatedGroupState = {
                        ...currentGroupState,
                        [key]: !currentGroupState[key]
                    };
                    // If 'other' cabinet size is deselected, clear the 'other specify' field
                    if (fieldName === 'kitchenCabinetSize' && key === 'other' && !updatedGroupState.other) {
                        return { ...room, [fieldName]: updatedGroupState, kitchenCabinetSizeOther: '' };
                    }
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
        { id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for the room
          roomType: 'Living Room', customRoomName: '', lengthFt: '', widthFt: '',
          floorLevel: '',
          fan: 'N/A', washerDryerHookups: 'N/A', walkInCloset: 'N/A_WC',
          // Kitchen specific defaults
          kitchenIsland: false, kitchenRaisedBar: false, kitchenEatIn: false, kitchenCountertop: '',
          kitchenWalkInPantry: false, kitchenTileBacksplash: false, kitchenButlersPantry: false,
          kitchenCabinetSize: { s30inch: false, s36inch: false, s42inch: false, custom: false, other: false }, kitchenCabinetSizeOther: '',
          kitchenAppliancesColor: '', kitchenFridgeIncluded: 'No', kitchenFridgeColor: '',
          kitchenMicrowaveType: '', kitchenDishwasherIncluded: 'No', kitchenDishwasherColor: '',
          kitchenDisposal: 'No', kitchenCompactor: false, kitchenWineCooler: false,
          kitchenRangeType: { gasSingleOven: false, gasDoubleOven: false, electricSingleOven: false, electricDoubleOven: false, dualFuelSingleOven: false, dualFuelDoubleOven: false, cooktopOnly: false, wallOvenOnly: false, other: false },
          kitchenCooktopFuel: '', kitchenCooktopStyle: '', kitchenVentHoodType: '', kitchenOutdoorGrill: false,
          // Garage specific defaults
          garageSpaces: '0', garageLengthFt: '', garageWidthFt: '', garageDoorOpeners: '0',
          garageIsAttached: 'N/A', garageIsFinished: 'N/A', garageHasStorage: false, garageHasWorkshop: false,
          // Primary Bath specific defaults
          primaryBathGardenTub: false, primaryBathJets: false, primaryBathWalkInShower: false, primaryBathSeparateVanities: false,
          featuresNotes: '',
        },],}));};

  // Handles changes for any field within a specific room
  const handleRoomFieldChange = (roomId: string, fieldName: keyof Room, value: string | number | boolean | Record<string, boolean>) => {
    setFormData(prev => ({ ...prev, rooms: prev.rooms.map(room => room.id === roomId ? { ...room, [fieldName]: value } : room ), }));
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
    };
    
    console.log("Final Form Data:", JSON.stringify(finalDataToSend, null, 2)); // Logs data with timestamp

    // Use the test webhook URL provided
    const n8nWebhookUrl = "https://goodhelpai-n8n.onrender.com/webhook-test/c757d1e2-886c-4523-a36e-22b782567ad2";
    // const n8nProductionWebhookUrl = "https://goodhelpai-n8n.onrender.com/webhook/c757d1e2-886c-4523-a36e-22b782567ad2";


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
        await response.json(); // Assuming n8n sends back a JSON confirmation
        setSubmissionStatus('Form submitted successfully!');
        alert('Success! Form data submitted.'); // User-friendly success message
      } else {
        const errorText = await response.text();
        setSubmissionStatus(`Error: ${response.status} ${response.statusText}. ${errorText}`);
        alert(`Submit Error: ${response.status} ${errorText}`); // User-friendly error message
      }
    } catch (error: any) {
      setSubmissionStatus(`An error occurred: ${error.message}`);
      alert(`Error: ${error.message}`); // User-friendly error message
    }
  };

  // NB: Updated neubrutalismBaseInputClasses with hard shadow and bolder focus state
  // Base Tailwind classes for standard input fields (text, number, select, textarea)
  const neubrutalismBaseInputClasses = "mt-1 block w-full border-2 border-black p-3 shadow-[2px_2px_0px_#000000] focus:ring-4 focus:ring-black focus:ring-offset-0 focus:border-black focus:outline-none sm:text-sm bg-white text-black placeholder-neutral-400";

  // Renders a standard input field
  const renderInput = (name: keyof FormData, label: string, type = 'text', placeholder = '', isConditional = false, condition?: boolean) => {
    if (isConditional && !condition && name !== 'acTypeOther') return null; // Conditional rendering
    return (
      <div className={`mb-4 ${isConditional && !condition && name !== 'acTypeOther' ? 'hidden' : ''}`}>
        {/* NB: Label text to black */}
        <label htmlFor={name as string} className="block text-sm font-bold text-black mb-1">{label}</label>
        <input
          type={type}
          name={name as string}
          id={name as string}
          value={String(formData[name] ?? '')}
          onChange={handleChange}
          placeholder={placeholder}
          className={neubrutalismBaseInputClasses}
        />
      </div>
    );
  };

  // Renders a textarea field
  const renderTextarea = (name: keyof FormData, label: string, placeholder = '') => (
    <div className="mb-4">
      {/* NB: Label text to black */}
      <label htmlFor={name as string} className="block text-sm font-bold text-black mb-1">{label}</label>
      <textarea
        name={name as string}
        id={name as string}
        value={String(formData[name] ?? '')}
        onChange={handleChange}
        placeholder={placeholder}
        rows={3}
        className={neubrutalismBaseInputClasses}
      />
    </div>
  );

  // Renders a select dropdown field
  const renderSelect = (name: keyof FormData, label: string, options: readonly string[] | readonly {value: string, label: string}[], isConditional = false, condition?: boolean, currentVal?: string) => {
    if (isConditional && !condition) return null; // Conditional rendering
    const valueToUse = currentVal !== undefined ? currentVal : String(formData[name] ?? '');
    return (
      <div className={`mb-4 ${isConditional && !condition ? 'hidden' : ''}`}>
        {/* NB: Label text to black */}
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

  // Renders a group of radio buttons
  const renderRadioGroup = (
    nameComposite: keyof FormData | `kitchenFridgeIncluded-${string}` | `kitchenFridgeColor-${string}`, // Composite name for room-specific radios
    label: string,
    options: Array<{label: string, value: string}>,
    isConditional = false,
    condition?: boolean,
    roomId?: string // Optional room ID for context
  ) => {
    if (isConditional && !condition) return null; // Conditional rendering

    let currentRadioValue = '';
    // Determine current value based on whether it's a room field or root field
    if (roomId) {
        const room = formData.rooms.find(r => r.id === roomId);
        const firstHyphenIndex = (nameComposite as string).indexOf('-');
        const baseFieldName = (nameComposite as string).substring(0, firstHyphenIndex);
        const fieldKey = baseFieldName as keyof Room; // Type assertion
        if (room && fieldKey in room) {
            currentRadioValue = String((room as any)[fieldKey] ?? '');
        } else if (room) {
            currentRadioValue = ''; // Default if field not present
        }
    } else {
        currentRadioValue = String(formData[nameComposite as keyof FormData] ?? '');
    }

    return (
      <div className={`mb-4 ${isConditional && !condition ? 'hidden' : ''}`}>
        {/* NB: Label text to black */}
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
                className="sr-only custom-radio-input" // Hide default radio, style custom one
              />
              {/* Custom styled radio button */}
              <span className="custom-radio-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                {currentRadioValue === opt.value && <span className="w-2.5 h-2.5 bg-black"></span>} {/* Inner dot for selected */}
              </span>
              {/* NB: Radio label text to black */}
              <span className="text-black text-sm">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  // Renders a single checkbox
  const renderCheckbox = (name: string, label: string, isChecked: boolean, onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void, parentId?: string) => {
    const id = parentId ? `${name}-${parentId}` : name; // Unique ID for the checkbox
    return (
        <label htmlFor={id} className="flex items-center space-x-2 py-1 cursor-pointer">
            <input
              type="checkbox"
              id={id}
              name={name}
              checked={isChecked}
              onChange={onChangeCallback}
              className="sr-only custom-checkbox-input" // Hide default checkbox
            />
            {/* Custom styled checkbox */}
            <span className="custom-checkbox-button w-5 h-5 border-2 border-black bg-white inline-flex items-center justify-center mr-2 flex-shrink-0">
                {isChecked && <span className="w-2.5 h-2.5 bg-black"></span>} {/* Inner mark for checked */}
            </span>
            {/* NB: Checkbox label text to black */}
            <span className="text-sm font-medium text-black">{label}</span>
        </label>
    );
  };

  // Renders a group of chip-style toggle buttons
  const renderChipGroup = (
    groupNameComposite: ChipGroupCompositeKeys, // Composite name for room-specific chips
    label: string,
    options: Record<string, string>,
    currentChipStateParam?: Record<string, boolean>, // Current state for room chips
    roomId?: string // Optional room ID for context
  ) => {
    let stateToUse: Record<string, boolean> = {};
    // Determine current state based on whether it's a room field or root field
    if (roomId && currentChipStateParam) {
        stateToUse = currentChipStateParam;
    } else if (!roomId && formData[groupNameComposite as FormChipGroupKeys]) {
        stateToUse = formData[groupNameComposite as FormChipGroupKeys] as Record<string, boolean>;
    }

    return (
    <div className="mb-4">
      {/* NB: Label text to black */}
      <span className="block text-sm font-bold text-black mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {Object.entries(options).map(([key, optionLabel]) => (
          <button
            type="button"
            key={key}
            onClick={() => handleChipToggle(groupNameComposite, key)}
            // NB: Updated chip styles for selected and unselected states
            className={`p-3 border-2 border-black font-medium text-sm transition-all duration-150 ease-in-out active:translate-y-0.5 active:shadow-inner rounded-none
                        ${(stateToUse)[key]
                          ? 'bg-indigo-600 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)]' // Selected style
                          : 'bg-gray-100 text-black hover:bg-yellow-300 hover:text-black' // Unselected style
                        }`}
          >
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
    );
  };

  // Helper to get the icon for a room type
  const getRoomIcon = (roomValue: string): string => { const roomDetail = roomTypeDetails.find(rtd => rtd.value === roomValue); return roomDetail ? roomDetail.icon : '❓'; }; // Default icon

  // NB: Label text to black in all renderRoom* functions
  // Renders a select field specifically for a room property
  const renderRoomSelect = (roomId: string, fieldName: keyof Room, label: string, options: readonly string[] | readonly RoomTypeDetail[] | KitchenApplianceColorType[] | FloorLevelType[], currentValue: string) => (
    <div>
      <label htmlFor={`${fieldName}-${roomId}`} className="block text-sm font-bold text-black mb-1">{label}</label>
      <select
        id={`${fieldName}-${roomId}`}
        name={fieldName as string}
        value={currentValue}
        onChange={(e) => handleRoomFieldChange(roomId, fieldName, e.target.value)}
        className={neubrutalismBaseInputClasses}
      >
        <option value="">Select...</option>
        {options.map(opt =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={(opt as RoomTypeDetail).value || String(opt)} value={(opt as RoomTypeDetail).value || String(opt)}>
              {(opt as RoomTypeDetail).label || String(opt)}
            </option>
          )
        )}
      </select>
    </div>
  );

  // Renders an input field specifically for a room property
  const renderRoomInput = (roomId: string, fieldName: keyof Room, label: string, type = 'text', currentValue: string | number, placeholder = '') => (
    <div>
      <label htmlFor={`${fieldName}-${roomId}`} className="block text-sm font-bold text-black mb-1">{label}</label>
      <input
        type={type}
        id={`${fieldName}-${roomId}`}
        name={fieldName as string}
        value={currentValue}
        placeholder={placeholder}
        onChange={(e) => handleRoomFieldChange(roomId, fieldName, type === 'number' ? parseFloat(e.target.value) || '' : e.target.value)}
        className={neubrutalismBaseInputClasses}
      />
    </div>
  );

  // Renders a checkbox specifically for a room property
  const renderRoomCheckbox = (roomId: string, fieldName: keyof Room, label: string, currentValue: boolean) => (
     <label className="flex items-center space-x-2 col-span-1 py-2 cursor-pointer">
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

  // Renders a textarea specifically for a room property
  const renderRoomTextarea = (roomId: string, fieldName: keyof Room, label: string, currentValue: string) => (
    <div className="md:col-span-2">
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
    // NB: Consider a bolder page background like bg-yellow-300 or bg-neutral-200 for even more pop. For now, keeping bg-yellow-50.
    // NB: Added font-['Inter',_sans-serif] as an example. You can change 'Inter' to your preferred neubrutalist font.
    // Using 'Inter' font as a good neubrutalist option.
    <div className="bg-yellow-100 min-h-screen p-4 sm:p-8 flex flex-col items-center font-['Inter',_sans-serif]">
      <div className="w-full max-w-3xl">
        {/* Form Header */}
        <header className="bg-blue-600 text-white p-6 shadow-hard-black border-4 border-black mb-8 rounded-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">Cudd Realty Measurement Form</h1>
          <p className="text-center text-sm sm:text-base mt-1">Step {currentStep} of 7</p>
          {/* NB: Progress bar fill to bg-green-600 for slightly more depth */}
          {/* Progress Bar */}
          <div className="mt-4 bg-neutral-300 border-2 border-black h-6 rounded-none">
            <div
              className="bg-green-500 h-full border-r-2 border-black transition-all duration-300 ease-in-out rounded-none"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>
        </header>

        {/* Main Form Body */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border-4 border-black shadow-hard-black space-y-6 rounded-none">
          {/* Step 1: Basic Information */}
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

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 2: Property Details</h2>
              {/* NB: Slider labels to text-black and focus style for slider track */}
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

          {/* Step 3: Room Specifications */}
          {currentStep === 3 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 3: Room Specifications</h2>
              {formData.rooms.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-black">
                  <p className="text-neutral-600 mb-4">No rooms added yet. Click below to add the first room.</p>
                  <button type="button" onClick={addRoom} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 border-b-4 border-green-700 hover:border-green-800 shadow-md active:shadow-none active:translate-y-1 text-lg rounded-none">
                    Add First Room
                  </button>
                </div>
              ) : (
                <>
                  {formData.rooms.map((room, index) => (
                    // NB: Room card with black border and hard shadow, no rounded corners
                    <div key={room.id} className="mb-6 p-4 border-2 border-black shadow-[6px_6px_0px_#000000] relative rounded-none bg-white">
                      <div className="flex justify-between items-center mb-3">
                        {/* NB: Room card title to text-black */}
                        <h3 className="text-lg font-semibold text-black">
                          {getRoomIcon(room.roomType) && <span className="mr-2 text-xl">{getRoomIcon(room.roomType)}</span>}
                          Room {index + 1} {room.customRoomName && `- ${room.customRoomName}`}
                        </h3>
                        {/* NB: Remove button shadow removed, no rounded corners */}
                        <button type="button" onClick={() => removeRoom(room.id)} className="bg-red-500 text-white px-3 py-1 text-xs font-bold border-2 border-black hover:bg-red-700 active:bg-red-800 rounded-none">
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {renderRoomSelect(room.id, 'roomType', 'Room Type', roomTypeDetails, room.roomType)}
                        {room.roomType !== 'Garage' && renderRoomSelect(room.id, 'floorLevel', 'Floor Level', floorLevelOptions, room.floorLevel || '')}
                        {renderRoomInput(room.id, 'customRoomName', 'Custom Name (Optional)', 'text', room.customRoomName, 'e.g. Kids Room')}
                        {renderRoomInput(room.id, 'lengthFt', 'Length (ft)', 'number', room.lengthFt, 'e.g. 12.5')}
                        {renderRoomInput(room.id, 'widthFt', 'Width (ft)', 'number', room.widthFt, 'e.g. 10')}
                        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 pt-2 border-t border-black"> {/* NB: Border to black */}
                          {renderRoomSelect(room.id, 'fan', 'Fan?', yesNoNaOptions, room.fan)}
                          {(room.roomType === 'Utility Room' || room.roomType === 'Garage') && renderRoomSelect(room.id, 'washerDryerHookups', 'W/D Hookups?', yesNoNaOptions, room.washerDryerHookups || 'N/A')}
                          {(room.roomType.includes('Bedroom') || room.roomType.includes('Primary')) && renderRoomSelect(room.id, 'walkInCloset', 'Walk-in Closet?', yesNoNaOptions, room.walkInCloset) }
                        </div>
                        {/* Primary Bedroom Specific Features */}
                        {room.roomType === 'Primary Bedroom' && (
                          <>
                            {/* NB: HR line to border-black */}
                            <hr className="md:col-span-2 my-4 border-t-2 border-black"/>
                            {/* NB: Subheader text to black */}
                            <h4 className="md:col-span-2 text-md font-semibold mb-0 text-black">Primary Bathroom Features:</h4>
                            <div className="md:col-span-2 grid grid-cols-2 gap-x-6 gap-y-0">
                                {renderRoomCheckbox(room.id, 'primaryBathGardenTub', 'Garden Tub', !!room.primaryBathGardenTub)}
                                {renderRoomCheckbox(room.id, 'primaryBathJets', 'Jets', !!room.primaryBathJets)}
                                {renderRoomCheckbox(room.id, 'primaryBathWalkInShower', 'Walk-In Shower', !!room.primaryBathWalkInShower)}
                                {renderRoomCheckbox(room.id, 'primaryBathSeparateVanities', 'Separate Vanities', !!room.primaryBathSeparateVanities)}
                            </div>
                          </>
                        )}
                        {/* Kitchen Specific Features */}
                        {room.roomType === 'Kitchen' && (
                          <>
                            <hr className="md:col-span-2 my-4 border-t-2 border-black"/>
                            <h4 className="md:col-span-2 text-md font-semibold mb-2 text-black">Kitchen Details:</h4>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                              {renderRoomCheckbox(room.id, 'kitchenIsland', 'Island', room.kitchenIsland)}
                              {renderRoomCheckbox(room.id, 'kitchenRaisedBar', 'Raised Bar', room.kitchenRaisedBar)}
                              {renderRoomCheckbox(room.id, 'kitchenEatIn', 'Eat-in Kitchen', room.kitchenEatIn)}
                              {renderRoomCheckbox(room.id, 'kitchenWalkInPantry', 'Walk-in Pantry', room.kitchenWalkInPantry)}
                              {renderRoomCheckbox(room.id, 'kitchenTileBacksplash', 'Tile Backsplash', room.kitchenTileBacksplash)}
                              {renderRoomCheckbox(room.id, 'kitchenButlersPantry', 'Butler\'s Pantry', room.kitchenButlersPantry)}
                              {renderRoomCheckbox(room.id, 'kitchenCompactor', 'Compactor', room.kitchenCompactor)}
                              {renderRoomCheckbox(room.id, 'kitchenWineCooler', 'Wine Cooler', room.kitchenWineCooler)}
                              {renderRoomCheckbox(room.id, 'kitchenOutdoorGrill', 'Outdoor Grill', room.kitchenOutdoorGrill)}
                            </div>
                            <hr className="md:col-span-2 my-3 border-t border-black"/>
                            {renderChipGroup(`kitchenCabinetSize-${room.id}` as ChipGroupCompositeKeys, 'Cabinet Size', kitchenCabinetSizeChipOptions, room.kitchenCabinetSize, room.id)}
                            {room.kitchenCabinetSize?.other && renderRoomInput(room.id, 'kitchenCabinetSizeOther', 'Specify Other Cabinet Size', 'text', room.kitchenCabinetSizeOther)}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                {renderRoomSelect(room.id, 'kitchenCountertop', 'Countertop', kitchenCountertopOptions, room.kitchenCountertop)}
                                {renderRoomSelect(room.id, 'kitchenAppliancesColor', 'General Appliances Color', kitchenApplianceColorOptions, room.kitchenAppliancesColor)}
                            </div>
                            <hr className="md:col-span-2 my-3 border-t border-black"/>
                            <div className="md:col-span-2"> {renderRadioGroup(`kitchenFridgeIncluded-${room.id}` as `kitchenFridgeIncluded-${string}`, 'Fridge Included?', yesNoOptions, false, undefined, room.id)} </div>
                            {room.kitchenFridgeIncluded === 'Yes' && <div className="md:col-span-2"> {renderRadioGroup(`kitchenFridgeColor-${room.id}` as `kitchenFridgeColor-${string}`, 'Fridge Color', kitchenFridgeColorOptions, false, undefined, room.id)} </div>}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                {renderRoomSelect(room.id, 'kitchenMicrowaveType', 'Microwave Type', kitchenMicrowaveTypeOptions, room.kitchenMicrowaveType)}
                                {renderRoomSelect(room.id, 'kitchenDishwasherIncluded', 'Dishwasher Included?', yesNoNegotiableOptions, room.kitchenDishwasherIncluded)}
                                {room.kitchenDishwasherIncluded !== 'No' && renderRoomSelect(room.id, 'kitchenDishwasherColor', 'Dishwasher Color', kitchenFridgeColorOptions.map(o=>o.value), room.kitchenDishwasherColor)}
                                {renderRoomSelect(room.id, 'kitchenDisposal', 'Disposal?', yesNoOptions.map(o=>o.value), room.kitchenDisposal)}
                            </div>
                            <hr className="md:col-span-2 my-3 border-t border-black"/>
                            {renderChipGroup(`kitchenRangeType-${room.id}` as ChipGroupCompositeKeys, 'Range Type (Select all that apply)', kitchenRangeTypeChipOptions, room.kitchenRangeType, room.id)}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-2">
                                {renderRoomSelect(room.id, 'kitchenCooktopFuel', 'Separate Cooktop Fuel (if no range or range is other)', kitchenCooktopFuelOptions, room.kitchenCooktopFuel)}
                                {room.kitchenCooktopFuel !== 'None (Range Only)' && room.kitchenCooktopFuel !== '' && renderRoomSelect(room.id, 'kitchenCooktopStyle', 'Cooktop Style', kitchenCooktopStyleOptions, room.kitchenCooktopStyle)}
                                {renderRoomSelect(room.id, 'kitchenVentHoodType', 'Vent Hood Type', kitchenVentHoodTypeOptions, room.kitchenVentHoodType)}
                            </div>
                          </>
                        )}
                        {/* Garage Specific Features */}
                        {room.roomType === 'Garage' && (
                          <>
                            <hr className="md:col-span-2 my-4 border-t-2 border-black"/>
                            <h4 className="md:col-span-2 text-md font-semibold mb-2 text-black">Garage Details:</h4>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                              {renderRoomSelect(room.id, 'garageSpaces', 'Garage Spaces', garageSpaceOptions, room.garageSpaces)}
                              {renderRoomInput(room.id, 'garageLengthFt', 'Garage Length (ft)', 'number', room.garageLengthFt)}
                              {renderRoomInput(room.id, 'garageWidthFt', 'Garage Width (ft)', 'number', room.garageWidthFt)}
                              {renderRoomSelect(room.id, 'garageDoorOpeners', '# Door Openers', garageDoorOpenerOptions, room.garageDoorOpeners)}
                              {renderRoomSelect(room.id, 'garageIsAttached', 'Attached?', yesNoNaOptions, room.garageIsAttached)}
                              {renderRoomSelect(room.id, 'garageIsFinished', 'Finished?', yesNoNaOptions, room.garageIsFinished)}
                              {renderRoomCheckbox(room.id, 'garageHasStorage', 'Storage', room.garageHasStorage)}
                              {renderRoomCheckbox(room.id, 'garageHasWorkshop', 'Workshop', room.garageHasWorkshop)}
                            </div>
                          </>
                        )}
                      </div>
                      {renderRoomTextarea(room.id, 'featuresNotes', 'Features / Notes for this Room', room.featuresNotes)}
                      <p className="text-xs text-neutral-500 mt-2">Photo upload: Coming Soon!</p>
                    </div>
                  ))}
                  <button type="button" onClick={addRoom} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 shadow-md active:shadow-none active:translate-y-1 rounded-none">
                    Add Another Room
                  </button>
                </>
              )}
            </section>
          )}

          {/* Step 4: Carport & RV Pad */}
          {currentStep === 4 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 4: Carport & RV Pad</h2>
              {renderRadioGroup('carport', 'Carport', yesNoOptions)}
              {renderInput('carportLengthFt', 'Carport Length (ft)', 'number', '', true, formData.carport === 'Yes')}
              {renderInput('carportWidthFt', 'Carport Width (ft)', 'number', '', true, formData.carport === 'Yes')}
              {renderRadioGroup('rvPad', 'RV Pad', yesNoOptions)}
              {renderInput('rvPadLengthFt', 'RV Pad Length (ft)', 'number', '', true, formData.rvPad === 'Yes')}
              {renderInput('rvPadWidthFt', 'RV Pad Width (ft)', 'number', '', true, formData.rvPad === 'Yes')}
            </section>
          )}

          {/* Step 5: Flooring */}
          {currentStep === 5 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 5: Flooring</h2>
              {renderChipGroup('flooringTypes', 'Flooring Types (Select all that apply)', flooringTypeOptions)}
              {renderInput('specifyOtherFlooringType', 'Specify Other Flooring Type', 'text', 'e.g., Bamboo')}
            </section>
          )}

          {/* Step 6: Additional Details & Features */}
          {currentStep === 6 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 6: Additional Details & Features</h2>
              {renderInput('roofType', 'Roof Type/Material', 'text', 'e.g., Composition Shingle, Metal')}
              {renderRadioGroup('hasPatios', 'Patios', yesNoOptions)}
              {formData.hasPatios === 'Yes' && (
                // NB: Patio container border and shadow, no rounded corners
                <div className="my-4 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] rounded-none bg-neutral-50">
                  {/* NB: Subheader text to black */}
                  <h3 className="text-md font-bold text-black mb-2">Patio Details</h3>
                  {formData.patios.map((patio, index) => (
                    // NB: Individual patio item border, no rounded corners
                    <div key={patio.id} className="mb-4 p-3 border-2 border-black relative rounded-none bg-white">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-black">Patio {index + 1}</p>
                        {/* NB: Updated remove button style, no rounded corners */}
                        <button type="button" onClick={() => removePatio(patio.id)} className="bg-red-500 text-white px-2 py-0.5 text-xs font-bold border-2 border-black hover:bg-red-700 active:bg-red-800 rounded-none">Remove</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <input type="number" placeholder="Length (ft)" value={patio.lengthFt} onChange={e => handlePatioChange(patio.id, 'lengthFt', e.target.value)} className={`${neubrutalismBaseInputClasses} p-2`} />
                        <input type="number" placeholder="Width (ft)" value={patio.widthFt} onChange={e => handlePatioChange(patio.id, 'widthFt', e.target.value)} className={`${neubrutalismBaseInputClasses} p-2`} />
                      </div>
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {renderCheckbox(`isCovered-${patio.id}`, 'Covered', patio.isCovered, e => handlePatioChange(patio.id, 'isCovered', e.target.checked))}
                        {renderCheckbox(`isUncovered-${patio.id}`, 'Uncovered', patio.isUncovered, e => handlePatioChange(patio.id, 'isUncovered', e.target.checked))}
                        {renderCheckbox(`isConcrete-${patio.id}`, 'Concrete', patio.isConcrete, e => handlePatioChange(patio.id, 'isConcrete', e.target.checked))}
                        {renderCheckbox(`isPavers-${patio.id}`, 'Pavers', patio.isPavers, e => handlePatioChange(patio.id, 'isPavers', e.target.checked))}
                        {renderCheckbox(`isGravel-${patio.id}`, 'Gravel', patio.isGravel, e => handlePatioChange(patio.id, 'isGravel', e.target.checked))}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addPatio} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 text-sm border-b-2 border-blue-700 hover:border-blue-800 shadow-sm active:shadow-none active:translate-y-0.5 rounded-none">Add Patio</button>
                </div>
              )}
              {renderRadioGroup('hasSheds', 'Sheds', yesNoOptions)}
              {formData.hasSheds === 'Yes' && (
                // NB: Shed container border and shadow, no rounded corners
                <div className="my-4 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] rounded-none bg-neutral-50">
                  {/* NB: Subheader text to black */}
                  <h3 className="text-md font-bold text-black mb-2">Shed Details</h3>
                  {formData.sheds.map((shed, index) => (
                    // NB: Individual shed item border, no rounded corners
                    <div key={shed.id} className="mb-4 p-3 border-2 border-black relative rounded-none bg-white">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-black">Shed {index + 1}</p>
                        {/* NB: Updated remove button style, no rounded corners */}
                        <button type="button" onClick={() => removeShed(shed.id)} className="bg-red-500 text-white px-2 py-0.5 text-xs font-bold border-2 border-black hover:bg-red-700 active:bg-red-800 rounded-none">Remove</button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <input type="number" placeholder="Length (ft)" value={shed.lengthFt} onChange={e => handleShedChange(shed.id, 'lengthFt', e.target.value)} className={`${neubrutalismBaseInputClasses} p-2`} />
                        <input type="number" placeholder="Width (ft)" value={shed.widthFt} onChange={e => handleShedChange(shed.id, 'widthFt', e.target.value)} className={`${neubrutalismBaseInputClasses} p-2`} />
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addShed} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 text-sm border-b-2 border-blue-700 hover:border-blue-800 shadow-sm active:shadow-none active:translate-y-0.5 rounded-none">Add Shed</button>
                </div>
              )}
              {renderRadioGroup('hasFireplace', 'Fireplace', yesNoOptions)}
              {renderSelect('numberOfFireplaces', 'Number of Fireplaces', fireplaceNumberOptions, true, formData.hasFireplace === 'Yes', formData.numberOfFireplaces)}
              {formData.hasFireplace === 'Yes' && formData.numberOfFireplaces !== '0' && (
                // NB: Fireplace features container border, no rounded corners
                <div className="my-3 p-3 border-2 border-black rounded-none bg-neutral-50">
                  {/* NB: Subheader text to black */}
                  <h4 className="text-sm font-semibold text-black mb-1">Fireplace Features:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                    {renderCheckbox('fireplaceFeatures.wood', 'Wood Burning', formData.fireplaceFeatures.wood, handleChange)}
                    {renderCheckbox('fireplaceFeatures.gas', 'Gas', formData.fireplaceFeatures.gas, handleChange)}
                    {renderCheckbox('fireplaceFeatures.gasLogs', 'Gas Logs', formData.fireplaceFeatures.gasLogs, handleChange)}
                    {renderCheckbox('fireplaceFeatures.electricStarter', 'Electric Starter', formData.fireplaceFeatures.electricStarter, handleChange)}
                    {renderCheckbox('fireplaceFeatures.vaultedCeilingsNearFP', 'Vaulted Ceilings (near FP)', formData.fireplaceFeatures.vaultedCeilingsNearFP, handleChange)}
                    {renderCheckbox('fireplaceFeatures.programmableThermostatFP', 'Programmable Thermostat (FP)', formData.fireplaceFeatures.programmableThermostatFP, handleChange)}
                  </div>
                </div>
              )}
              {renderRadioGroup('waterHeaterType', 'Water Heater Type', waterHeaterOptions)}
              {renderRadioGroup('acType', 'A/C Type', acOptions)}
              {renderInput('acTypeOther', 'Specify Other A/C Type', 'text', '', true, formData.acType === 'Other')}
              {renderRadioGroup('heatType', 'Heat Type', heatOptions)}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {renderRadioGroup('pool', 'Pool', yesNoOptions)}
                {renderRadioGroup('hotTubSpa', 'Hot Tub/Spa', yesNoOptions)}
                {renderRadioGroup('sprinklerSystem', 'Sprinkler System', yesNoOptions)}
                {renderRadioGroup('alarmSystem', 'Alarm System', yesNoOptions)}
              </div>
              {renderSelect('numberOfSmokeDetectors', 'Number of Smoke Detectors', smokeDetectorNumberOptions)}
              {renderInput('lotNumber', 'Lot Number (if applicable)', 'text')}
              {renderChipGroup('yardFeatures', 'Yard Features', { backyardGrass: 'Backyard Grass', someTrees: 'Some Trees', noTrees: 'No Trees' })}
              {renderChipGroup('communityAmenities', 'Community Amenities', { pool: 'Pool', park: 'Park', walkingPaths: 'Walking Paths', clubHouse: 'Club House', weightRoom: 'Weight Room', greenbelt: 'Greenbelt', playground: 'Playground', tennis: 'Tennis', pond: 'Pond' })}
              {renderRadioGroup('deck', 'Deck', yesNoOptions)}
              {renderSelect('fenceHeight', 'Fence Height', ['N/A', '4ft', '6ft', '8ft', 'Other'], false, undefined, formData.fenceHeight)}
              {renderRadioGroup('programmableThermostat', 'Programmable Thermostat (General)?', yesNoOptions)}
            </section>
          )}

          {/* Step 7: Review & Submit */}
          {currentStep === 7 && (
            <section>
              <h2 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">Step 7: Review & Submit</h2>
              {renderTextarea('additionalPropertyDescription', 'Overall Property Description / Final Notes', 'Unique features, general notes, items not covered elsewhere, etc.')}
              <p className="my-4 text-sm text-black">Please review all your entries before submitting.</p>
              {/* NB: Review box styles updated, no rounded corners */}
              <div className="bg-neutral-100 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] max-h-96 overflow-y-auto space-y-1 text-xs rounded-none">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="py-1">
                    <strong className="font-mono capitalize text-black">{key.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, l => l.toUpperCase())}: </strong>
                    <span className="font-mono break-all whitespace-pre-wrap text-neutral-700">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
              {submissionStatus && (
                <p className={`mt-4 text-sm p-3 border-2 border-black rounded-none ${submissionStatus.startsWith('Error') ? 'bg-red-200 text-red-800 border-red-800' : 'bg-green-200 text-green-800 border-green-800'}`}>
                  {submissionStatus}
                </p>
              )}
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t-2 border-black flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-neutral-600 hover:bg-neutral-700 text-white font-bold py-3 px-6 border-b-4 border-neutral-800 hover:border-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:shadow-none active:translate-y-1 rounded-none"
            >
              Previous
            </button>
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 border-b-4 border-green-700 hover:border-green-800 shadow-md active:shadow-none active:translate-y-1 rounded-none"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 border-b-4 border-green-700 hover:border-green-800 shadow-md active:shadow-none active:translate-y-1 rounded-none"
                disabled={submissionStatus === 'Submitting...'}
              >
                {submissionStatus === 'Submitting...' ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>

         {/* NB: Footer text to text-black and slightly bolder */}
        <footer className="text-center mt-12 pb-8 text-sm text-black">
            <p>&copy; {new Date().getFullYear()} Cudd Realty. Internal Use Only.</p>
            <div className="my-2"></div> {/* Added for spacing */}
            <p className="font-mono">(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Made by GoodHelpAI</p>
        </footer>
      </div>

      {/* Global Styles for custom elements and neubrutalist overrides */}
      <style jsx global>{`
        /* Hard shadow utility class */
        .shadow-hard-black {
           box-shadow: 8px 8px 0px #000000;
        }

        /* Remove default browser appearance from select to allow custom arrow */
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          /* Custom arrow using SVG - black color */
          background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
          background-repeat: no-repeat;
          background-position: right 0.7rem center; /* Position arrow */
          background-size: 0.65em auto; /* Size of arrow */
          padding-right: 2.5rem; /* Space for arrow */
        }

        /* Custom focus style for radio buttons and checkboxes */
        .custom-radio-input:focus + .custom-radio-button,
        .custom-checkbox-input:focus + .custom-checkbox-button {
            outline: 3px solid black; /* Bolder black outline on focus */
            outline-offset: 2px;
        }

        /* Slider thumb styling for WebKit browsers (Chrome, Safari) */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; /* Remove default appearance */
          appearance: none;
          width: 20px; /* Thumb width */
          height: 20px; /* Thumb height */
          background: #0052cc; /* Blue color for thumb, can be adjusted */
          border: 2px solid black; /* Black border */
          cursor: pointer; /* Pointer cursor on hover */
          border-radius: 0; /* NB: Square thumb */
        }

        /* Slider thumb styling for Mozilla Firefox */
        input[type="range"]::-moz-range-thumb {
          width: 18px; /* Thumb width (Firefox often needs slightly different sizing) */
          height: 18px; /* Thumb height */
          background: #0052cc; /* Blue color for thumb */
          border: 2px solid black; /* Black border */
          cursor: pointer; /* Pointer cursor on hover */
          border-radius: 0; /* NB: Square thumb */
        }

        /* Ensure all major interactive elements have no rounded corners by default for neubrutalism */
        button, input, select, textarea, .shadow-hard-black, .custom-radio-button, .custom-checkbox-button {
            border-radius: 0 !important; /* Override Tailwind's default rounding if any */
        }
      `}</style>
    </div>
  );
}
