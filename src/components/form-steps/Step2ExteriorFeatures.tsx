// src/components/form-steps/Step2ExteriorFeatures.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { exteriorFeatureOptions, yesNoOptions } from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { ChipGroup } from "@/components/form-elements/ChipGroup";
import PatiosShedsManager from "./PatiosShedsManager";

export default function Step2ExteriorFeatures(props: StepProps) {
  const { formData, handleChange, handleChipToggle } = props;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Exterior Features</h2>
      
      <ChipGroup
        label="Exterior Wall Finishes"
        options={exteriorFeatureOptions}
        selectedOptions={formData.exteriorFeatures}
        onToggle={(key) => handleChipToggle('exteriorFeatures', key)}
        name="exteriorFeatures"
      />

      <StyledRadioGroup
        label="Is there an HOA?"
        name="hoa"
        options={yesNoOptions}
        value={formData.hoa}
        onValueChange={(value) => handleChange({ target: { name: 'hoa', value } } as any)}
      />
      {formData.hoa === 'Yes' && (
        <StyledInput
          label="Monthly HOA Dues ($)"
          name="monthlyHoaDues"
          type="number"
          value={formData.monthlyHoaDues}
          onChange={handleChange}
          placeholder="e.g., 150"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <StyledRadioGroup
            label="Carport?"
            name="carport"
            options={yesNoOptions}
            value={formData.carport}
            onValueChange={(value) => handleChange({ target: { name: 'carport', value } } as any)}
          />
          {formData.carport === 'Yes' && (
            <div className="mt-2 grid grid-cols-2 gap-4">
              <StyledInput label="Carport Length (ft)" name="carportLengthFt" type="number" value={formData.carportLengthFt} onChange={handleChange} />
              <StyledInput label="Carport Width (ft)" name="carportWidthFt" type="number" value={formData.carportWidthFt} onChange={handleChange} />
            </div>
          )}
        </div>
        <div>
          <StyledRadioGroup
            label="RV Pad?"
            name="rvPad"
            options={yesNoOptions}
            value={formData.rvPad}
            onValueChange={(value) => handleChange({ target: { name: 'rvPad', value } } as any)}
          />
          {formData.rvPad === 'Yes' && (
            <div className="mt-2 grid grid-cols-2 gap-4">
              <StyledInput label="RV Pad Length (ft)" name="rvPadLengthFt" type="number" value={formData.rvPadLengthFt} onChange={handleChange} />
              <StyledInput label="RV Pad Width (ft)" name="rvPadWidthFt" type="number" value={formData.rvPadWidthFt} onChange={handleChange} />
            </div>
          )}
        </div>
      </div>
      
      <PatiosShedsManager {...props} />

      <StyledInput
        label="Roof Type"
        name="roofType"
        value={formData.roofType}
        onChange={handleChange}
        placeholder="e.g., Composition Shingle, Metal"
      />
    </div>
  );
}
