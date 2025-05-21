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

      {/* yardFeatures MOVED to Step5Flooring.tsx */}
      {/* deck, fenceHeight, fenceMaterials MOVED to Step5Flooring.tsx */}


      <ChipGroup
        label="Community Amenities"
        options={communityAmenityOptions}
        selectedOptions={formData.communityAmenities}
        onToggle={(key) => handleChipToggle('communityAmenities', key)}
        name="communityAmenities"
      />

      {/* programmableThermostat MOVED to Step4Rooms.tsx */}
    </div>
  );
}
