// src/components/form-elements/ChipButton.tsx
"use client";
import type React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChipButtonProps extends React.ComponentProps<typeof Button> {
  isActive: boolean;
}

export function ChipButton({ isActive, children, className, ...props }: ChipButtonProps) {
  return (
    <Button
      type="button" // Important to prevent form submission if not intended
      variant="outline"
      className={cn(
        "neubrutalism-button py-2 px-4 text-sm h-auto",
        isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-card text-card-foreground hover:bg-muted",
        className
      )}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </Button>
  );
}
