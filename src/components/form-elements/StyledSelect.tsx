// src/components/form-elements/StyledSelect.tsx
"use client";
import type React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledSelectProps extends React.ComponentProps<typeof Select> {
  label: string;
  placeholder?: string;
  options: readonly { value: string; label: string }[] | readonly string[];
  name?: string; // Required for html form submission, though react-hook-form might handle it
  containerClassName?: string;
  className?: string; // For the trigger
  contentClassName?: string; // For the content
}

export function StyledSelect({
  label,
  placeholder,
  options,
  name,
  value,
  onValueChange,
  containerClassName,
  className,
  contentClassName,
  ...props
}: StyledSelectProps) {
  return (
    <div className={cn("mb-6", containerClassName)}>
      <Label htmlFor={name} className="block text-sm font-bold mb-1">
        {label}
      </Label>
      <Select name={name} value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger id={name} className={cn("neubrutalism-input py-0 h-auto", className)}>
          <SelectValue placeholder={placeholder || `Select ${label}...`} />
        </SelectTrigger>
        <SelectContent 
            className={cn(
              "rounded-none border-2 border-black bg-card text-card-foreground shadow-[2px_2px_0px_theme(colors.black)]",
              contentClassName
            )}
        >
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <SelectItem key={opt} value={opt} className="focus:bg-accent focus:text-accent-foreground rounded-none">
                {opt}
              </SelectItem>
            ) : (
              <SelectItem key={opt.value} value={opt.value} className="focus:bg-accent focus:text-accent-foreground rounded-none">
                {opt.label}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
