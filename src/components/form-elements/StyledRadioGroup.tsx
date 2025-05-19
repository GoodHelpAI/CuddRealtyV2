// src/components/form-elements/StyledRadioGroup.tsx
"use client";
import type React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledRadioGroupProps extends React.ComponentProps<typeof RadioGroup> {
  label: string;
  options: readonly { value: string; label: string }[];
  name?: string;
  containerClassName?: string;
}

export function StyledRadioGroup({
  label,
  options,
  name,
  value,
  onValueChange,
  containerClassName,
  className,
  ...props
}: StyledRadioGroupProps) {
  return (
    <div className={cn("mb-6", containerClassName)}>
      <Label className="block text-sm font-bold mb-2">{label}</Label>
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onValueChange}
        className={cn("flex flex-col space-y-2", className)}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className="rounded-none border-2 border-black text-primary focus:ring-primary focus:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
            <Label htmlFor={`${name}-${option.value}`} className="font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
