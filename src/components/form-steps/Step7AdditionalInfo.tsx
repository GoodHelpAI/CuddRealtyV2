"use client";

import React from "react";
import type { StepProps } from "@/interfaces";
import { StyledTextarea } from "@/components/form-elements/StyledTextarea";

/**
 * Step 7 – Additional Information
 */
export default function Step7AdditionalInfo({ formData, handleChange }: StepProps) {
  return (
    <div className="space-y-8">
      <StyledTextarea
        label="Additional Property Description"
        name="additionalPropertyDescription"
        value={formData.additionalPropertyDescription}
        onChange={handleChange}
        placeholder="Provide any other relevant details about the property…"
        rows={6}
      />
      {/* Review section removed */}
    </div>
  );
}