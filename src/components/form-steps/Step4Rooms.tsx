// src/components/form-steps/Step4Rooms.tsx
"use client";
import type { StepProps } from "@/interfaces";
import RoomCard from "./RoomCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Step4Rooms(props: StepProps) {
  const { formData, addRoom } = props;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-6">
        <h2 className="text-2xl font-bold">Room Details</h2>
        <Button type="button" onClick={addRoom} className="neubrutalism-button bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-5 w-5 mr-2" /> Add Room
        </Button>
      </div>
      
      {formData.rooms.length === 0 && (
        <p className="text-muted-foreground text-center py-4">No rooms added yet. Click "Add Room" to get started.</p>
      )}

      {formData.rooms.map((room, index) => (
        <RoomCard
          key={room.id}
          room={room}
          index={index}
          {...props} // Pass all step props down
        />
      ))}
    </div>
  );
}
