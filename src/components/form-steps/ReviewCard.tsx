"use client";
import React from "react";
import type { FormData } from "@/interfaces";

interface ReviewCardProps {
  formData: FormData;
}

/**
 * ReviewCard component for displaying a summary of the form data
 */
export default function ReviewCard({ formData }: ReviewCardProps) {
  return (
    <div className="bg-neutral-100 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] max-h-96 overflow-y-auto space-y-1 text-xs rounded-none">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="py-1">
          <strong className="font-mono capitalize text-black">{key.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, l => l.toUpperCase())}: </strong>
          <span className="font-mono break-all whitespace-pre-wrap text-neutral-700">
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}
