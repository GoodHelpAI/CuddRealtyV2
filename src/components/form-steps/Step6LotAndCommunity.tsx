// src/components/form-steps/Step6LotAndCommunity.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { 
  yesNoOptions, 
  yardFeatureOptions, 
  communityAmenityOptions, 
  fenceMaterialOptions 
} from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { ChipGroup } from "@/components/form-elements/ChipGroup";

export default function Step6LotAndCommunity({ formData, handleChange, handleChipToggle }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Lot & Community</h2>
      
      <StyledInput
        label="Lot Number (if applicable)"
        name="lotNumber"
        value={formData.lotNumber}
        onChange={handleChange}
        placeholder="e.g., 12B"
      />

      <ChipGroup
        label="Yard Features"
        options={yardFeatureOptions}
        selectedOptions={formData.yardFeatures}
        onToggle={(key) => handleChipToggle('yardFeatures', key)}
        name="yardFeatures"
      />

      <ChipGroup
        label="Community Amenities"
        options={communityAmenityOptions}
        selectedOptions={formData.communityAmenities}
        onToggle={(key) => handleChipToggle('communityAmenities', key)}
        name="communityAmenities"
      />

      <StyledRadioGroup
        label="Deck?"
        name="deck"
        options={yesNoOptions}
        value={formData.deck}
        onValueChange={(value) => handleChange({ target: { name: 'deck', value } } as any)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledInput
          label="Fence Height (ft, if applicable)"
          name="fenceHeight"
          type="text" // Can be range e.g. 6-8
          value={formData.fenceHeight}
          onChange={handleChange}
          placeholder="e.g., 6 or 6-8"
        />
        <ChipGroup
          label="Fence Materials"
          options={fenceMaterialOptions}
          selectedOptions={formData.fenceMaterials}
          onToggle={(key) => handleChipToggle('fenceMaterials', key)}
          name="fenceMaterials"
          containerClassName="md:col-span-1"
        />
      </div>

      <StyledRadioGroup
        label="Programmable Thermostat?"
        name="programmableThermostat"
        options={yesNoOptions}
        value={formData.programmableThermostat}
        onValueChange={(value) => handleChange({ target: { name: 'programmableThermostat', value } } as any)}
      />
    </div>
  );
}
