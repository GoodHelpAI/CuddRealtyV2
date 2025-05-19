// src/components/form-elements/StyledTextarea.tsx
"use client";
import type React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledTextareaProps extends React.ComponentProps<typeof Textarea> {
  label: string;
  containerClassName?: string;
}

export function StyledTextarea({ label, name, id, containerClassName, className, ...props }: StyledTextareaProps) {
  const textareaId = id || name;
  return (
    <div className={cn("mb-6", containerClassName)}>
      <Label htmlFor={textareaId} className="block text-sm font-bold mb-1">
        {label}
      </Label>
      <Textarea
        id={textareaId}
        name={name}
        className={cn(
          "neubrutalism-input",
          "min-h-[100px]", // Ensure decent height
          className
        )}
        {...props}
      />
    </div>
  );
}
