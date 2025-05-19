// src/components/form-elements/StyledSlider.tsx
"use client";
import type React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface StyledSliderProps extends React.ComponentProps<typeof Slider> {
  label: string;
  name?: string;
  containerClassName?: string;
  showValue?: boolean;
}

export function StyledSlider({
  label,
  name,
  value,
  containerClassName,
  className,
  showValue = true,
  ...props
}: StyledSliderProps) {
  return (
    <div className={cn("mb-6", containerClassName)}>
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={name} className="block text-sm font-bold">
          {label}
        </Label>
        {showValue && value && <span className="text-sm font-medium">{value[0]}</span>}
      </div>
      <Slider
        name={name}
        id={name}
        value={value}
        className={cn(
          "[&>.slider-track]:bg-secondary [&>.slider-track>.slider-range]:bg-primary [&>.slider-thumb]:rounded-none [&>.slider-thumb]:border-2 [&>.slider-thumb]:border-primary [&>.slider-thumb]:bg-card [&>.slider-thumb]:shadow-[2px_2px_0px_theme(colors.black)]",
          className
        )}
        {...props}
      />
    </div>
  );
}

// Note: The specific classes like .slider-track, .slider-range, .slider-thumb might need adjustment
// based on how ShadCN Slider is structured internally if direct child selectors don't work.
// It's often better to modify the Slider component in src/components/ui/slider.tsx directly
// to use CSS variables for these parts if complex styling is needed.
// For now, this attempts to style via className, assuming some parts can be targeted.
// If not, update src/components/ui/slider.tsx's default classes.
// The provided slider.tsx in ShadCN uses SliderPrimitive.Track and SliderPrimitive.Thumb.
// These will pick up --radius: 0rem for rounded-full becoming square.
// Track bg-secondary and Range bg-primary will use theme colors.
// Thumb border-primary bg-background will use theme colors.
// This component might just need to pass className to the root Slider.
// The styling above is an attempt if direct component styling is insufficient.
// A simpler version:
/*
export function StyledSlider({ label, name, value, containerClassName, className, showValue = true, ...props }: StyledSliderProps) {
  return (
    <div className={cn("mb-6", containerClassName)}>
      <div className="flex justify-between items-center mb-1">
        <Label htmlFor={name} className="block text-sm font-bold">
          {label}
        </Label>
        {showValue && value && <span className="text-sm font-medium">{value[0]}</span>}
      </div>
      <Slider
        name={name}
        id={name}
        value={value}
        className={cn(className)} // Apply base Neubrutalist style via global CSS or specific classes here
        {...props}
      />
    </div>
  );
}
*/
