// src/components/form-steps/Step5Flooring.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { flooringTypeOptions } from "@/data/form-options";
import { ChipGroup } from "@/components/form-elements/ChipGroup";
import { StyledInput } from "@/components/form-elements/StyledInput";

export default function Step5Flooring({ formData, handleChange, handleChipToggle }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Flooring & Systems</h2>
      
      <ChipGroup
        label="Flooring Types Present"
        options={flooringTypeOptions}
        selectedOptions={formData.flooringTypes}
        onToggle={(key) => handleChipToggle('flooringTypes', key)}
        name="flooringTypes"
      />

      <StyledInput
        label="Specify Other Flooring Type (if any)"
        name="specifyOtherFlooringType"
        value={formData.specifyOtherFlooringType}
        onChange={handleChange}
        placeholder="e.g., Bamboo, Cork"
      />
    </div>
  );
}
