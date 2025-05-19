// src/components/form-steps/KitchenFields.tsx
"use client";
import type { Room, StepProps } from "@/interfaces";
import {
  kitchenCountertopOptions,
  kitchenCabinetSizeChipOptions,
  kitchenApplianceColorOptions,
  kitchenFridgeColorOptions,
  kitchenMicrowaveTypeOptions,
  kitchenDishwasherColorOptions,
  kitchenRangeTypeChipOptions,
  kitchenCooktopFuelOptions,
  kitchenCooktopStyleOptions,
  kitchenVentHoodTypeOptions,
  yesNoOptions,
  yesNoNegotiableOptions
} from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { ChipButton } from "@/components/form-elements/ChipButton";
import { ChipGroup } from "@/components/form-elements/ChipGroup"; // Import ChipGroup
import { Label } from "@/components/ui/label"; // For Checkbox label
import { Checkbox } from "@/components/ui/checkbox"; // For boolean toggles
import { cn } from "@/lib/utils";

interface KitchenFieldsProps {
  room: Room;
  onRoomChange: StepProps['handleRoomFieldChange'];
  onChipToggle: StepProps['handleChipToggle'];
  onRadioChange: StepProps['handleRadioChange'];
}

const StyledCheckbox = ({ label, checked, onChange, id }: { label:string, checked: boolean, onChange: (checked: boolean) => void, id: string }) => (
  <div className="flex items-center space-x-2 my-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onChange} className="rounded-none border-2 border-black data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"/>
    <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
  </div>
);

export default function KitchenFields({ room, onRoomChange, onChipToggle, onRadioChange }: KitchenFieldsProps) {
  const handleCheckboxChange = (field: keyof Room, checked: boolean) => {
    onRoomChange(room.id, field, checked);
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-black space-y-4">
      <h4 className="text-md font-semibold">Kitchen Details</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StyledCheckbox label="Island" id={`kitchenIsland-${room.id}`} checked={room.kitchenIsland} onChange={(c) => handleCheckboxChange('kitchenIsland', c)} />
        <StyledCheckbox label="Raised Bar" id={`kitchenRaisedBar-${room.id}`} checked={room.kitchenRaisedBar} onChange={(c) => handleCheckboxChange('kitchenRaisedBar', c)} />
        <StyledCheckbox label="Eat-In Area" id={`kitchenEatIn-${room.id}`} checked={room.kitchenEatIn} onChange={(c) => handleCheckboxChange('kitchenEatIn', c)} />
        <StyledCheckbox label="Walk-In Pantry" id={`kitchenWalkInPantry-${room.id}`} checked={room.kitchenWalkInPantry} onChange={(c) => handleCheckboxChange('kitchenWalkInPantry', c)} />
        <StyledCheckbox label="Tile Backsplash" id={`kitchenTileBacksplash-${room.id}`} checked={room.kitchenTileBacksplash} onChange={(c) => handleCheckboxChange('kitchenTileBacksplash', c)} />
        <StyledCheckbox label="Butler's Pantry" id={`kitchenButlersPantry-${room.id}`} checked={room.kitchenButlersPantry} onChange={(c) => handleCheckboxChange('kitchenButlersPantry', c)} />
        <StyledCheckbox label="Compactor" id={`kitchenCompactor-${room.id}`} checked={room.kitchenCompactor} onChange={(c) => handleCheckboxChange('kitchenCompactor', c)} />
        <StyledCheckbox label="Wine Cooler" id={`kitchenWineCooler-${room.id}`} checked={room.kitchenWineCooler} onChange={(c) => handleCheckboxChange('kitchenWineCooler', c)} />
        <StyledCheckbox label="Outdoor Grill Hookup" id={`kitchenOutdoorGrill-${room.id}`} checked={room.kitchenOutdoorGrill} onChange={(c) => handleCheckboxChange('kitchenOutdoorGrill', c)} />
      </div>

      <StyledSelect
        label="Countertop Material"
        options={kitchenCountertopOptions}
        value={room.kitchenCountertop}
        onValueChange={(value) => onRoomChange(room.id, 'kitchenCountertop', value)}
        placeholder="Select Countertop"
      />

      <ChipGroup
        label="Cabinet Size"
        options={kitchenCabinetSizeChipOptions}
        selectedOptions={room.kitchenCabinetSize}
        onToggle={(key) => onChipToggle(`kitchenCabinetSize-${room.id}`, key)}
        name={`kitchenCabinetSize-${room.id}`}
      />
      {room.kitchenCabinetSize.other && (
        <StyledInput
          label="Specify Other Cabinet Size"
          value={room.kitchenCabinetSizeOther}
          onChange={(e) => onRoomChange(room.id, 'kitchenCabinetSizeOther', e.target.value)}
        />
      )}

      <StyledSelect
        label="Appliance Color (Overall)"
        options={kitchenApplianceColorOptions}
        value={room.kitchenAppliancesColor}
        onValueChange={(value) => onRoomChange(room.id, 'kitchenAppliancesColor', value)}
        placeholder="Select Appliance Color"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledRadioGroup
          label="Fridge Included?"
          name={`kitchenFridgeIncluded-${room.id}`} // Composite name
          options={yesNoOptions}
          value={room.kitchenFridgeIncluded}
          onValueChange={(value) => onRadioChange(`kitchenFridgeIncluded-${room.id}`, value)}
        />
        {room.kitchenFridgeIncluded === 'Yes' && (
          <StyledRadioGroup
            label="Fridge Color"
            name={`kitchenFridgeColor-${room.id}`} // Composite name
            options={kitchenFridgeColorOptions}
            value={room.kitchenFridgeColor}
            onValueChange={(value) => onRadioChange(`kitchenFridgeColor-${room.id}`, value)}
          />
        )}
      </div>
      
      <StyledSelect
        label="Microwave Type"
        options={kitchenMicrowaveTypeOptions}
        value={room.kitchenMicrowaveType}
        onValueChange={(value) => onRoomChange(room.id, 'kitchenMicrowaveType', value)}
        placeholder="Select Microwave Type"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <StyledRadioGroup
            label="Dishwasher Included?"
            name={`kitchenDishwasherIncluded-${room.id}`}
            options={yesNoNegotiableOptions}
            value={room.kitchenDishwasherIncluded}
            onValueChange={(value) => onRadioChange(`kitchenDishwasherIncluded-${room.id}`, value)}
          />
        {room.kitchenDishwasherIncluded !== 'No' && (
            <StyledSelect
              label="Dishwasher Color"
              options={kitchenDishwasherColorOptions}
              value={room.kitchenDishwasherColor}
              onValueChange={(value) => onRoomChange(room.id, 'kitchenDishwasherColor', value)}
              placeholder="Select Dishwasher Color"
            />
        )}
      </div>
      
      <StyledRadioGroup
        label="Garbage Disposal?"
        name={`kitchenDisposal-${room.id}`}
        options={yesNoOptions}
        value={room.kitchenDisposal}
        onValueChange={(value) => onRadioChange(`kitchenDisposal-${room.id}`, value)}
      />
      
      <ChipGroup
        label="Range Type"
        options={kitchenRangeTypeChipOptions}
        selectedOptions={room.kitchenRangeType}
        onToggle={(key) => onChipToggle(`kitchenRangeType-${room.id}`, key)}
        name={`kitchenRangeType-${room.id}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Cooktop Fuel"
          options={kitchenCooktopFuelOptions}
          value={room.kitchenCooktopFuel}
          onValueChange={(value) => onRoomChange(room.id, 'kitchenCooktopFuel', value)}
          placeholder="Select Cooktop Fuel"
        />
        <StyledSelect
          label="Cooktop Style"
          options={kitchenCooktopStyleOptions}
          value={room.kitchenCooktopStyle}
          onValueChange={(value) => onRoomChange(room.id, 'kitchenCooktopStyle', value)}
          placeholder="Select Cooktop Style"
        />
      </div>
      
      <StyledSelect
        label="Vent Hood Type"
        options={kitchenVentHoodTypeOptions}
        value={room.kitchenVentHoodType}
        onValueChange={(value) => onRoomChange(room.id, 'kitchenVentHoodType', value)}
        placeholder="Select Vent Hood Type"
      />
    </div>
  );
}
