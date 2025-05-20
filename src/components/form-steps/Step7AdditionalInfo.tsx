"use client";

import React from "react";
import type { StepProps } from "@/interfaces";
import { StyledTextarea } from "@/components/form-elements/StyledTextarea";

/**
 * Step 7 – Additional Information
 * --------------------------------------------------
 * Simplified per user request:
 * • Removes the review / summary card completely.
 * • Increases the free-text notes field by roughly 50 % (rows ➜ 9).
 */
export default function Step7AdditionalInfo({ formData, handleChange }: StepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Please review all your entries before submitting.
        </h2>
        <StyledTextarea
          label="Additional Property Description"
          name="additionalPropertyDescription"
          value={formData.additionalPropertyDescription}
          onChange={handleChange}
          placeholder="Provide any other relevant details about the property…"
          rows={9} // 50 % more than the previous 6 rows
        />
      </div>
      {/* Optionally add a review/summary section here if needed */}
    </div>
  );
}
