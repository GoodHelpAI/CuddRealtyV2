// src/components/form-steps/Step7AdditionalInfo.tsx
"use client";
import type { StepProps } from "@/interfaces";
import { StyledTextarea } from "@/components/form-elements/StyledTextarea";

export default function Step7AdditionalInfo({ formData, handleChange }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">Additional Information</h2>
      
      <StyledTextarea
        label="Additional Property Description"
        name="additionalPropertyDescription"
        value={formData.additionalPropertyDescription}
        onChange={handleChange}
        placeholder="Provide any other relevant details about the property..."
        rows={6}
      />

      <div className="mt-6 p-4 border-2 border-black bg-card shadow-[2px_2px_0px_theme(colors.black)]">
        <h3 className="text-lg font-semibold mb-2">Review & Submit</h3>
        <p className="text-sm text-muted-foreground">
          You're at the final step! Please review all the information you've entered in the previous steps. 
          Once you're satisfied, click the "Submit Form" button below.
        </p>
      </div>
    </div>
  );
}
