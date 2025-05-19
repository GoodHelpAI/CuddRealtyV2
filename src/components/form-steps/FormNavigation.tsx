// src/components/form-steps/FormNavigation.tsx
"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  prevStep: () => void;
  isSubmitting?: boolean;
}

export function FormNavigation({ currentStep, totalSteps, prevStep, isSubmitting }: FormNavigationProps) {
  return (
    <div className="mt-8 pt-6 border-t-2 border-black flex justify-between items-center">
      <Button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1 || isSubmitting}
        className="neubrutalism-button bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Previous
      </Button>
      
      {currentStep < totalSteps ? (
        <Button
          type="submit" // Will trigger validation if form is wrapped with react-hook-form, or just proceed
          className="neubrutalism-button bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          disabled={isSubmitting}
          // onClick is handled by form's onSubmit for next step logic
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      ) : (
        <Button
          type="submit"
          className="neubrutalism-button bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Form"} <Send className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
