// src/components/form-steps/Step4Rooms.tsx
"use client";
import type { StepProps } from "@/interfaces";
import RoomCard from "./RoomCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { smokeDetectorNumberOptions, yesNoOptions } from "@/data/form-options";
import { FormFieldHeading } from "@/components/form-elements/FormFieldHeading";


export default function Step4Rooms(props: StepProps) {
  const { formData, addRoom, handleChange } = props;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Room Details & Systems</h2>
        <Button type="button" onClick={addRoom} className="neubrutalism-button bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-5 w-5 mr-2" /> Add Room
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Add specifications for each room. After adding rooms, please provide details for general home systems below.
      </p>
      
      <div className="border-b-2 border-black pb-2 mb-6"></div>


      {formData.rooms.length === 0 && (
        <p className="text-muted-foreground text-center py-4">No rooms added yet. Click "Add Room" to get started.</p>
      )}

      {formData.rooms.map((room, index) => (
        <RoomCard
          key={room.id}
          room={room}
          index={index}
          {...props} // Pass all step props down
        />
      ))}

      <div className="border-t-2 border-dashed border-neutral-300 my-8 pt-6">
        <FormFieldHeading title="General Home Systems" />
        
        <StyledSelect
          label="Number of Smoke Detectors"
          name="numberOfSmokeDetectors"
          value={formData.numberOfSmokeDetectors}
          onChange={handleChange}
          options={smokeDetectorNumberOptions.map(num => ({ label: String(num), value: String(num) }))}
          placeholder="Select number"
        />

        <StyledRadioGroup
          label="Alarm System?"
          name="alarmSystem"
          options={yesNoOptions}
          value={formData.alarmSystem}
          onValueChange={(value) => handleChange({ target: { name: 'alarmSystem', value } } as any)}
        />

        <StyledRadioGroup
          label="Sprinkler System?"
          name="sprinklerSystem"
          options={yesNoOptions}
          value={formData.sprinklerSystem}
          onValueChange={(value) => handleChange({ target: { name: 'sprinklerSystem', value } } as any)}
        />
      </div>
    </div>
  );
}
