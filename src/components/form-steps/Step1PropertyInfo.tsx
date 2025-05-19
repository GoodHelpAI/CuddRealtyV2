// src/components/form-steps/Step1PropertyInfo.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { usStates, propertyTypes } from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { StyledSlider } from "@/components/form-elements/StyledSlider";

export default function Step1PropertyInfo({ formData, handleChange, handleSliderChange }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Property Information</h2>
      <StyledInput
        label="Street Address"
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleChange}
        placeholder="e.g., 123 Main St"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StyledInput
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g., Anytown"
          required
        />
        <StyledSelect
          label="State"
          name="state"
          value={formData.state}
          onValueChange={(value) => handleChange({ target: { name: "state", value } } as any)}
          options={usStates}
          placeholder="Select State"
          required
        />
        <StyledInput
          label="Zip Code"
          name="zipCode"
          type="text" // Use text for patterns, or number if strictly numeric
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="e.g., 12345"
          pattern="[0-9]{5}"
          title="Enter a 5-digit zip code"
          required
        />
      </div>
      <StyledSelect
        label="Property Type"
        name="propertyType"
        value={formData.propertyType}
        onValueChange={(value) => handleChange({ target: { name: "propertyType", value } } as any)}
        options={propertyTypes}
        required
      />
      <StyledSlider
        label="Total Bedrooms"
        name="totalBedrooms"
        min={0}
        max={10}
        step={1}
        value={[formData.totalBedrooms]}
        onValueChange={(value) => handleSliderChange('totalBedrooms', value[0])}
      />
      <StyledSlider
        label="Total Bathrooms"
        name="totalBathrooms"
        min={0}
        max={10}
        step={0.5}
        value={[formData.totalBathrooms]}
        onValueChange={(value) => handleSliderChange('totalBathrooms', value[0])}
      />
    </div>
  );
}
