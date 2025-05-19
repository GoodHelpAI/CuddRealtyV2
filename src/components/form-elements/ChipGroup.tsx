// src/components/form-elements/ChipGroup.tsx
"use client";
import type React from 'react';
import { Label } from "@/components/ui/label";
import { ChipButton } from "./ChipButton";
import { cn } from '@/lib/utils';

interface ChipGroupProps<T extends string> {
  label: string;
  options: Record<T, string>;
  selectedOptions: Record<T, boolean>;
  onToggle: (optionKey: T) => void;
  name?: string; // For group identification, e.g., accessibility
  containerClassName?: string;
  className?: string; // For the div wrapping chips
}

export function ChipGroup<T extends string>({
  label,
  options,
  selectedOptions,
  onToggle,
  name,
  containerClassName,
  className,
}: ChipGroupProps<T>) {
  const groupId = name ? `${name}-label` : undefined;
  return (
    <div className={cn("mb-6", containerClassName)}>
      <Label id={groupId} className="block text-sm font-bold mb-2">
        {label}
      </Label>
      <div role="group" aria-labelledby={groupId} className={cn("flex flex-wrap gap-2", className)}>
        {(Object.keys(options) as T[]).map((key) => (
          <ChipButton
            key={key as string}
            isActive={selectedOptions[key] || false}
            onClick={() => onToggle(key)}
          >
            {options[key]}
          </ChipButton>
        ))}
      </div>
    </div>
  );
}
