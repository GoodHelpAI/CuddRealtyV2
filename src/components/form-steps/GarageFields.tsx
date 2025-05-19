// src/components/form-steps/GarageFields.tsx
"use client";
import type { Room, StepProps } from "@/interfaces";
import { garageSpaceOptions, garageDoorOpenerOptions, yesNoNaOptions } from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface GarageFieldsProps {
  room: Room;
  onRoomChange: StepProps['handleRoomFieldChange'];
}

const StyledCheckbox = ({ label, checked, onChange, id }: { label:string, checked: boolean, onChange: (checked: boolean) => void, id: string }) => (
  <div className="flex items-center space-x-2 my-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onChange} className="rounded-none border-2 border-black data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"/>
    <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
  </div>
);


export default function GarageFields({ room, onRoomChange }: GarageFieldsProps) {
  const handleCheckboxChange = (field: keyof Room, checked: boolean) => {
    onRoomChange(room.id, field, checked);
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-black space-y-4">
      <h4 className="text-md font-semibold">Garage Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Garage Spaces"
          options={garageSpaceOptions}
          value={room.garageSpaces}
          onValueChange={(value) => onRoomChange(room.id, 'garageSpaces', value)}
        />
        <StyledSelect
          label="Door Openers"
          options={garageDoorOpenerOptions}
          value={room.garageDoorOpeners}
          onValueChange={(value) => onRoomChange(room.id, 'garageDoorOpeners', value)}
        />
        <StyledInput
          label="Garage Length (ft)"
          type="number"
          value={room.garageLengthFt}
          onChange={(e) => onRoomChange(room.id, 'garageLengthFt', e.target.value)}
          placeholder="e.g., 20"
        />
        <StyledInput
          label="Garage Width (ft)"
          type="number"
          value={room.garageWidthFt}
          onChange={(e) => onRoomChange(room.id, 'garageWidthFt', e.target.value)}
          placeholder="e.g., 20"
        />
        <StyledSelect
          label="Attached Garage?"
          options={yesNoNaOptions}
          value={room.garageIsAttached}
          onValueChange={(value) => onRoomChange(room.id, 'garageIsAttached', value)}
        />
        <StyledSelect
          label="Finished Garage?"
          options={yesNoNaOptions}
          value={room.garageIsFinished}
          onValueChange={(value) => onRoomChange(room.id, 'garageIsFinished', value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledCheckbox label="Storage in Garage" id={`garageHasStorage-${room.id}`} checked={room.garageHasStorage} onChange={(c) => handleCheckboxChange('garageHasStorage', c)} />
        <StyledCheckbox label="Workshop in Garage" id={`garageHasWorkshop-${room.id}`} checked={room.garageHasWorkshop} onChange={(c) => handleCheckboxChange('garageHasWorkshop', c)} />
      </div>
    </div>
  );
}
