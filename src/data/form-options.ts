import type { FloorLevelType, KitchenApplianceColorType, RoomTypeDetail } from '@/interfaces';

export const initialRoomValues = {
  roomType: 'Living Room', customRoomName: '', lengthFt: '', widthFt: '',
  floorLevel: '' as FloorLevelType,
  fan: 'N/A' as const, washerDryerHookups: 'N/A' as const, walkInCloset: 'N/A_WC' as const,
  kitchenIsland: false, kitchenRaisedBar: false, kitchenEatIn: false, kitchenCountertop: '' as const,
  kitchenWalkInPantry: false, kitchenTileBacksplash: false, kitchenButlersPantry: false,
  kitchenCabinetSize: { s30inch: false, s36inch: false, s42inch: false, custom: false, other: false }, kitchenCabinetSizeOther: '',
  kitchenAppliancesColor: '' as KitchenApplianceColorType, kitchenFridgeIncluded: 'No' as const, kitchenFridgeColor: '' as const,
  kitchenMicrowaveType: '' as const, kitchenDishwasherIncluded: 'No' as const, kitchenDishwasherColor: '' as const,
  kitchenDisposal: 'No' as const, kitchenCompactor: false, kitchenWineCooler: false,
  kitchenRangeType: { gasSingleOven: false, gasDoubleOven: false, electricSingleOven: false, electricDoubleOven: false, dualFuelSingleOven: false, dualFuelDoubleOven: false, cooktopOnly: false, wallOvenOnly: false, other: false },
  kitchenCooktopFuel: '' as const, kitchenCooktopStyle: '' as const, kitchenVentHoodType: '' as const, kitchenOutdoorGrill: false,
  garageSpaces: '0' as const, garageLengthFt: '', garageWidthFt: '', garageDoorOpeners: '0' as const,
  garageIsAttached: 'N/A' as const, garageIsFinished: 'N/A' as const, garageHasStorage: false, garageHasWorkshop: false,
  primaryBathGardenTub: false, primaryBathJets: false, primaryBathWalkInShower: false, primaryBathSeparateVanities: false,
  featuresNotes: '',
};


export const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
export const propertyTypes = ['Single Family', 'Townhouse', 'Condo', 'Multi-Family', 'Land', 'Other'];

export const roomTypeDetails: RoomTypeDetail[] = [
  { value: 'Living Room', icon: '🛋️', name: 'Living Room', label: '🛋️ Living Room' },
  { value: 'Dining Room', icon: '🍽️', name: 'Dining Room', label: '🍽️ Dining Room' },
  { value: 'Kitchen', icon: '🍳', name: 'Kitchen', label: '🍳 Kitchen' },
  { value: 'Breakfast Nook', icon: '🥐', name: 'Breakfast Nook', label: '🥐 Breakfast Nook' },
  { value: 'Primary Bedroom', icon: '🛏️', name: 'Primary Bedroom', label: '🛏️ Primary Bedroom' },
  { value: 'Bedroom', icon: '🛌', name: 'Bedroom', label: '🛌 Bedroom' },
  { value: 'Bathroom', icon: '🛁', name: 'Bathroom', label: '🛁 Bathroom' },
  { value: 'Primary Bathroom', icon: '🚿', name: 'Primary Bathroom', label: '🚿 Primary Bathroom' },
  { value: 'Office', icon: '💼', name: 'Office', label: '💼 Office' },
  { value: 'Study', icon: '📚', name: 'Study', label: '📚 Study' },
  { value: 'Game Room', icon: '🎮', name: 'Game Room', label: '🎮 Game Room' },
  { value: 'Media Room', icon: '🎬', name: 'Media Room', label: '🎬 Media Room' },
  { value: 'Bonus Room', icon: '🎉', name: 'Bonus Room', label: '🎉 Bonus Room' },
  { value: 'Utility Room', icon: '🧺', name: 'Utility Room', label: '🧺 Utility Room' },
  { value: 'Garage', icon: '🚗', name: 'Garage', label: '🚗 Garage' },
  { value: 'Other', icon: '❓', name: 'Other', label: '❓ Other' },
];

export const floorLevelOptions: { value: FloorLevelType; label: string }[] = [
  { value: '1st', label: '1st Floor' },
  { value: '2nd', label: '2nd Floor' },
  { value: '3rd', label: '3rd Floor' },
  { value: 'Basement', label: 'Basement' },
  { value: '', label: 'N/A' },
];

export const yesNoOptions: {label:string, value:string}[] = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}];
export const yesNoNaOptions: {label:string, value:string}[] = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}, {label:'N/A', value:'N/A'}];
export const yesNoNaWCOptions: {label:string, value:string}[] = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}, {label:'N/A (Walk-in Closet)', value:'N/A_WC'}];
export const yesNoNegotiableOptions: {label:string, value:string}[] = [{label:'Yes', value:'Yes'}, {label:'No', value:'No'}, {label:'Negotiable', value:'Negotiable'}];


export const fireplaceNumberOptions = ['0', '1', '2', '3+'];
export const waterHeaterOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Tankless', value:'Tankless'}];
export const acOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Other', value:'Other'}];
export const heatOptions = [{label:'Gas', value:'Gas'}, {label:'Electric', value:'Electric'}, {label:'Heat Pump', value:'Heat Pump'}]; // Corrected Heat Pump value
export const smokeDetectorNumberOptions = ['0', '1', '2', '3', '4', '5+'];

export const exteriorFeatureOptions = {
    brick: "Brick",
    cementSiding: "Cement Siding",
    vinylSiding: "Vinyl Siding",
    woodSiding: "Wood Siding",
    stucco: "Stucco",
    gutters: "Gutters",
};

export const flooringTypeOptions = {
    carpet: "Carpet",
    tile: "Tile",
    vinylPlank: "Vinyl Plank",
    hardwood: "Hardwood",
    laminateWood: "Laminate Wood",
    stainedConcrete: "Stained Concrete",
    linoleum: "Linoleum",
    wood: "Wood (Other)",
    marble: "Marble",
};

export const fireplaceFeatureOptions = {
  wood: "Wood Burning",
  gas: "Gas Logs/Starter",
  gasLogs: "Gas Logs Only", // Clarified, original was "gasLogs"
  electricStarter: "Electric Starter", // This might be part of "Gas Logs/Starter"
  vaultedCeilingsNearFP: "Vaulted Ceilings Near FP",
  programmableThermostatFP: "Programmable Thermostat for FP",
};


export const kitchenCountertopOptions = ['Granite', 'Laminate', 'Corian', 'Tile', 'Quartz', 'Solid Surface', 'Marble', 'Other'];
export const kitchenCabinetSizeChipOptions = { s30inch: '30"', s36inch: '36"', s42inch: '42"', custom: 'Custom', other: 'Other (Specify)' };
export const kitchenFridgeColorOptions: {label:string, value:string}[] = [
    {label:'White (W)', value:'White (W)'}, 
    {label:'Black (B)', value:'Black (B)'}, 
    {label:'Stainless Steel (SS)', value:'Stainless Steel (SS)'},
];
export const kitchenApplianceColorOptions: {label: KitchenApplianceColorType, value: KitchenApplianceColorType}[] = [
    {label:'Stainless Steel (SS)', value:'Stainless Steel (SS)'}, 
    {label:'Black (B)', value:'Black (B)'}, 
    {label:'White (W)', value:'White (W)'}, 
    {label:'Mixed', value:'Mixed'}, 
    {label:'Panel Ready', value:'Panel Ready'}, 
    {label:'Other', value:'Other'}
];
export const kitchenMicrowaveTypeOptions = ['Flush-mount', 'Countertop', 'Built-in', 'Above Range (Hood Combo)', 'Drawer', 'None'];
export const kitchenDishwasherColorOptions: {label: string, value: string}[] = [
    {label:'Stainless Steel (SS)', value:'Stainless Steel (SS)'}, 
    {label:'Black (B)', value:'Black (B)'}, 
    {label:'White (W)', value:'White (W)'},
    {label:'Matches Appliances', value:'Matches Appliances'},
    {label:'Panel Ready', value:'Panel Ready'},
    {label:'Other', value:'Other'}
];

export const kitchenRangeTypeChipOptions = {
  gasSingleOven: 'Gas - Single Oven', gasDoubleOven: 'Gas - Double Oven',
  electricSingleOven: 'Electric - Single Oven', electricDoubleOven: 'Electric - Double Oven',
  dualFuelSingleOven: 'Dual Fuel - Single', dualFuelDoubleOven: 'Dual Fuel - Double',
  cooktopOnly: 'Cooktop Only', wallOvenOnly: 'Wall Oven Only', other: 'Other Range Type'
};
export const kitchenCooktopFuelOptions = ['Gas', 'Electric', 'Induction', 'None (Range Only)', 'Other'];
export const kitchenCooktopStyleOptions = ['Standard Burners', 'Glass/Smooth Top', 'Griddle Included', 'Grill Included', 'None'];
export const kitchenVentHoodTypeOptions = ['Standard Hood', 'Microwave Hood Combo', 'Downdraft', 'Island Hood/Chimney', 'Custom Insert', 'None'];
export const garageSpaceOptions = ['0', '1', '2', '3+', '4+'];
export const garageDoorOpenerOptions = ['0', '1', '2', '3+'];


export const yardFeatureOptions = {
  backyardGrass: "Backyard Grass",
  someTrees: "Some Trees",
  noTrees: "No Trees / Cleared",
};

export const communityAmenityOptions = {
  pool: "Pool",
  park: "Park",
  walkingPaths: "Walking Paths",
  clubHouse: "Club House",
  weightRoom: "Weight Room",
  greenbelt: "Greenbelt",
  playground: "Playground",
  tennis: "Tennis Courts",
  pond: "Pond/Lake",
};

export const fenceMaterialOptions = {
  wood: "Wood",
  vinyl: "Vinyl",
  chainLink: "Chain Link",
};
