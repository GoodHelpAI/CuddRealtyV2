// src/components/form-steps/Step3InteriorFeatures.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { 
  yesNoOptions, 
  fireplaceNumberOptions, 
  fireplaceFeatureOptions,
  waterHeaterOptions,
  acOptions,
  heatOptions,
  smokeDetectorNumberOptions
} from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { ChipGroup } from "@/components/form-elements/ChipGroup";

export default function Step3InteriorFeatures({ formData, handleChange, handleChipToggle, handleRadioChange }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Interior Features</h2>

      {/* Fireplace Section */}
      <div className="p-4 border-2 border-black shadow-[2px_2px_0px_theme(colors.black)] bg-card">
        <h3 className="text-lg font-semibold mb-3">Fireplace</h3>
        <StyledRadioGroup
          label="Has Fireplace?"
          name="hasFireplace"
          options={yesNoOptions}
          value={formData.hasFireplace}
          onValueChange={(value) => handleRadioChange('hasFireplace', value)}
        />
        {formData.hasFireplace === 'Yes' && (
          <>
            <StyledSelect
              label="Number of Fireplaces"
              name="numberOfFireplaces"
              options={fireplaceNumberOptions}
              value={formData.numberOfFireplaces}
              onValueChange={(value) => handleChange({ target: { name: 'numberOfFireplaces', value } } as any)}
            />
            <ChipGroup
              label="Fireplace Features"
              options={fireplaceFeatureOptions}
              selectedOptions={formData.fireplaceFeatures}
              onToggle={(key) => {
                // Special handling due to nested structure
                const newFeatures = { ...formData.fireplaceFeatures, [key]: !formData.fireplaceFeatures[key as keyof typeof formData.fireplaceFeatures] };
                handleChange({ target: { name: 'fireplaceFeatures', value: newFeatures } } as any);
              }}
              name="fireplaceFeatures"
            />
          </>
        )}
      </div>

      {/* HVAC Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StyledSelect
          label="Water Heater Type"
          name="waterHeaterType"
          options={waterHeaterOptions}
          value={formData.waterHeaterType}
          onValueChange={(value) => handleChange({ target: { name: 'waterHeaterType', value } } as any)}
          placeholder="Select Type"
        />
        <StyledSelect
          label="A/C Type"
          name="acType"
          options={acOptions}
          value={formData.acType}
          onValueChange={(value) => handleChange({ target: { name: 'acType', value } } as any)}
          placeholder="Select Type"
        />
        <StyledSelect
          label="Heat Type"
          name="heatType"
          options={heatOptions}
          value={formData.heatType}
          onValueChange={(value) => handleChange({ target: { name: 'heatType', value } } as any)}
          placeholder="Select Type"
        />
      </div>
      {formData.acType === 'Other' && (
        <StyledInput
          label="Specify Other A/C Type"
          name="acTypeOther"
          value={formData.acTypeOther}
          onChange={handleChange}
        />
      )}

      {/* Other Systems/Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <StyledRadioGroup label="Pool?" name="pool" options={yesNoOptions} value={formData.pool} onValueChange={(value) => handleChange({ target: { name: 'pool', value } } as any)} />
        <StyledRadioGroup label="Hot Tub/Spa?" name="hotTubSpa" options={yesNoOptions} value={formData.hotTubSpa} onValueChange={(value) => handleChange({ target: { name: 'hotTubSpa', value } } as any)} />
        <StyledRadioGroup label="Sprinkler System?" name="sprinklerSystem" options={yesNoOptions} value={formData.sprinklerSystem} onValueChange={(value) => handleChange({ target: { name: 'sprinklerSystem', value } } as any)} />
        <StyledRadioGroup label="Alarm System?" name="alarmSystem" options={yesNoOptions} value={formData.alarmSystem} onValueChange={(value) => handleChange({ target: { name: 'alarmSystem', value } } as any)} />
      </div>
      <StyledSelect
        label="Number of Smoke Detectors"
        name="numberOfSmokeDetectors"
        options={smokeDetectorNumberOptions}
        value={formData.numberOfSmokeDetectors}
        onValueChange={(value) => handleChange({ target: { name: 'numberOfSmokeDetectors', value } } as any)}
        placeholder="Select Number"
      />
    </div>
  );
}
