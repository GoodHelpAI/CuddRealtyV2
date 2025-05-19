// --- Interfaces ---
export interface RoomTypeDetail {
  value: string; label: string; icon: string; name: string;
}
export interface Patio {
  id: string; lengthFt: string; widthFt: string;
  isCovered: boolean; isUncovered: boolean; isConcrete: boolean; isPavers: boolean; isGravel: boolean;
}
export interface Shed {
  id: string; lengthFt: string; widthFt: string;
}

export type KitchenApplianceColorType = 'Stainless Steel (SS)' | 'Black (B)' | 'White (W)' | 'Mixed' | 'Panel Ready' | 'Other' | '';
export type FloorLevelType = '1st' | '2nd' | '3rd' | 'Basement' | '';


export interface Room {
  id: string; roomType: string; customRoomName: string; lengthFt: string; widthFt: string;
  floorLevel?: FloorLevelType;
  fan: 'Yes' | 'No' | 'N/A';
  washerDryerHookups: 'Yes' | 'No' | 'N/A';
  walkInCloset: 'Yes' | 'No' | 'N/A_WC'; // N/A_WC seems specific, ensure handled if different from N/A
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
export interface FormData {
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
}

export type FormChipGroupKeys = 'flooringTypes' | 'fenceMaterials' | 'yardFeatures' | 'communityAmenities' | 'exteriorFeatures';
export type RoomChipGroupBaseKeys = 'kitchenRangeType' | 'kitchenCabinetSize'; // Add other room-specific chip groups here if any
export type ChipGroupCompositeKeyForRoom<RoomKey extends RoomChipGroupBaseKeys> = `${RoomKey}-${string}`; // Template literal for room-specific keys

export type AnyChipGroupKey = FormChipGroupKeys | ChipGroupCompositeKeyForRoom<RoomChipGroupBaseKeys>;

export type StepProps = {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleRadioChange: (nameComposite: keyof FormData | `kitchenFridgeIncluded-${string}` | `kitchenFridgeColor-${string}` | `kitchenDisposal-${string}` | `kitchenDishwasherIncluded-${string}`, value: string) => void;
  handleSliderChange: (name: 'totalBedrooms' | 'totalBathrooms', value: string | number) => void;
  handleChipToggle: (groupNameComposite: AnyChipGroupKey, key: string) => void;
  handleRoomFieldChange: (roomId: string, fieldName: keyof Room, value: string | number | boolean | Record<string, boolean>) => void;
  addRoom: () => void;
  removeRoom: (roomId: string) => void;
  addPatio: () => void;
  handlePatioChange: (patioId: string, fieldName: keyof Omit<Patio, 'id'>, value: string | boolean) => void;
  removePatio: (patioId: string) => void;
  addShed: () => void;
  handleShedChange: (shedId: string, fieldName: keyof Omit<Shed, 'id'>, value: string) => void;
  removeShed: (shedId: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export type YesNo = 'Yes' | 'No';
export type YesNoNA = 'Yes' | 'No' | 'N/A';
export type YesNoNAWC = 'Yes' | 'No' | 'N/A_WC';
export type YesNoNegotiable = 'Yes' | 'No' | 'Negotiable';
