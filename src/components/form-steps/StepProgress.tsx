// src/components/form-steps/StepProgress.tsx
"use client";
import { Progress } from "@/components/ui/progress";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepNames = [
  "Property Info",
  "Exterior Features",
  "Interior Features",
  "Rooms",
  "Flooring & Systems",
  "Lot & Community",
  "Additional Info"
];

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{stepNames[currentStep-1]}</span>
      </div>
      <Progress value={progressPercentage} className="w-full h-3 rounded-none border-2 border-black bg-card shadow-[2px_2px_0px_theme(colors.black)] [&>div]:bg-primary" />
    </div>
  );
}
