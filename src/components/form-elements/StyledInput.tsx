// src/components/form-elements/StyledInput.tsx
"use client";
import type React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledInputProps extends React.ComponentProps<typeof Input> {
  label: string;
  containerClassName?: string;
}

export function StyledInput({ label, name, id, containerClassName, className, ...props }: StyledInputProps) {
  const inputId = id || name;
  return (
    <div className={cn("mb-6", containerClassName)}>
      <Label htmlFor={inputId} className="block text-sm font-bold mb-1">
        {label}
      </Label>
      <Input
        id={inputId}
        name={name}
        className={cn(
          "neubrutalism-input",
          className
        )}
        {...props}
      />
    </div>
  );
}
