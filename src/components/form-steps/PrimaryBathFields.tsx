// src/components/form-steps/PrimaryBathFields.tsx
"use client";
import type { Room, StepProps } from "@/interfaces";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PrimaryBathFieldsProps {
  room: Room;
  onRoomChange: StepProps['handleRoomFieldChange'];
}

const StyledCheckbox = ({ label, checked, onChange, id }: { label:string, checked: boolean, onChange: (checked: boolean) => void, id: string }) => (
  <div className="flex items-center space-x-2 my-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onChange} className="rounded-none border-2 border-black data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"/>
    <Label htmlFor={id} className="text-sm font-normal cursor-pointer">{label}</Label>
  </div>
);

export default function PrimaryBathFields({ room, onRoomChange }: PrimaryBathFieldsProps) {
  const handleCheckboxChange = (field: keyof Room, checked: boolean) => {
    onRoomChange(room.id, field, checked);
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-black space-y-2">
      <h4 className="text-md font-semibold">Primary Bathroom Features</h4>
      <StyledCheckbox label="Garden Tub" id={`primaryBathGardenTub-${room.id}`} checked={!!room.primaryBathGardenTub} onChange={(c) => handleCheckboxChange('primaryBathGardenTub', c)} />
      <StyledCheckbox label="Jets in Tub" id={`primaryBathJets-${room.id}`} checked={!!room.primaryBathJets} onChange={(c) => handleCheckboxChange('primaryBathJets', c)} />
      <StyledCheckbox label="Walk-In Shower" id={`primaryBathWalkInShower-${room.id}`} checked={!!room.primaryBathWalkInShower} onChange={(c) => handleCheckboxChange('primaryBathWalkInShower', c)} />
      <StyledCheckbox label="Separate Vanities" id={`primaryBathSeparateVanities-${room.id}`} checked={!!room.primaryBathSeparateVanities} onChange={(c) => handleCheckboxChange('primaryBathSeparateVanities', c)} />
    </div>
  );
}
