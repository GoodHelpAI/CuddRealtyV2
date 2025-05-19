// src/components/form-steps/RoomCard.tsx
"use client";
import type { Room, StepProps } from "@/interfaces";
import { roomTypeDetails, floorLevelOptions, yesNoNaOptions, yesNoNaWCOptions } from "@/data/form-options";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledSelect } from "@/components/form-elements/StyledSelect";
import { StyledTextarea } from "@/components/form-elements/StyledTextarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import KitchenFields from "./KitchenFields";
import GarageFields from "./GarageFields";
import PrimaryBathFields from "./PrimaryBathFields";

interface RoomCardProps extends StepProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index, handleRoomFieldChange, removeRoom, handleChipToggle, handleRadioChange }: RoomCardProps) {
  const isKitchen = room.roomType === 'Kitchen';
  const isGarage = room.roomType === 'Garage';
  const isPrimaryBathroom = room.roomType === 'Primary Bathroom';
  const isPrimaryBedroom = room.roomType === 'Primary Bedroom'; // Needed for Primary Bath section logic

  return (
    <div className="p-4 border-2 border-black shadow-[2px_2px_0px_theme(colors.black)] bg-card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Room {index + 1}: {room.roomType === 'Other' ? room.customRoomName || 'Other' : room.roomType}</h3>
        <Button
          type="button"
          variant="destructive"
          onClick={() => removeRoom(room.id)}
          className="neubrutalism-button text-sm p-2 h-auto"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledSelect
          label="Room Type"
          options={roomTypeDetails.map(rt => ({ value: rt.value, label: rt.label }))}
          value={room.roomType}
          onValueChange={(value) => handleRoomFieldChange(room.id, 'roomType', value)}
        />
        {room.roomType === 'Other' && (
          <StyledInput
            label="Custom Room Name"
            value={room.customRoomName}
            onChange={(e) => handleRoomFieldChange(room.id, 'customRoomName', e.target.value)}
            placeholder="Specify room name"
          />
        )}
        <StyledInput
          label="Length (ft)"
          type="number"
          value={room.lengthFt}
          onChange={(e) => handleRoomFieldChange(room.id, 'lengthFt', e.target.value)}
          placeholder="e.g., 12"
        />
        <StyledInput
          label="Width (ft)"
          type="number"
          value={room.widthFt}
          onChange={(e) => handleRoomFieldChange(room.id, 'widthFt', e.target.value)}
          placeholder="e.g., 10"
        />
        <StyledSelect
          label="Floor Level"
          options={floorLevelOptions}
          value={room.floorLevel}
          onValueChange={(value) => handleRoomFieldChange(room.id, 'floorLevel', value)}
        />
      </div>
      
      {!isKitchen && !isGarage && !isPrimaryBathroom && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <StyledSelect
            label="Ceiling Fan?"
            options={yesNoNaOptions}
            value={room.fan}
            onValueChange={(value) => handleRoomFieldChange(room.id, 'fan', value)}
          />
          {room.roomType === 'Utility Room' && (
             <StyledSelect
              label="Washer/Dryer Hookups?"
              options={yesNoNaOptions}
              value={room.washerDryerHookups}
              onValueChange={(value) => handleRoomFieldChange(room.id, 'washerDryerHookups', value)}
            />
          )}
          {(room.roomType.includes('Bedroom') || room.roomType === 'Bonus Room' || room.roomType === 'Office') && (
            <StyledSelect
              label="Walk-In Closet?"
              options={yesNoNaWCOptions}
              value={room.walkInCloset}
              onValueChange={(value) => handleRoomFieldChange(room.id, 'walkInCloset', value)}
            />
          )}
        </div>
      )}

      {isKitchen && <KitchenFields room={room} onRoomChange={handleRoomFieldChange} onChipToggle={handleChipToggle} onRadioChange={handleRadioChange} />}
      {isGarage && <GarageFields room={room} onRoomChange={handleRoomFieldChange} />}
      {(isPrimaryBathroom || (isPrimaryBedroom && !formData.rooms.some(r => r.roomType === 'Primary Bathroom'))) && 
        <PrimaryBathFields room={room} onRoomChange={handleRoomFieldChange} />
      }
      {/* If it's a Primary Bedroom and there's NO separate Primary Bathroom room added, show PBath fields here. */}


      <StyledTextarea
        label="Features & Notes for this Room"
        value={room.featuresNotes}
        onChange={(e) => handleRoomFieldChange(room.id, 'featuresNotes', e.target.value)}
        placeholder="e.g., Crown molding, built-in shelves, fresh paint..."
        containerClassName="mt-4"
      />
    </div>
  );
}
