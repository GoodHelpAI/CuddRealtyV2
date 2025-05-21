"use client";
import React from "react";
import type { FormData, Room, Patio, Shed } from "@/interfaces";

/**
 * Helper function to format label strings.
 */
const formatLabel = (key: string): string => {
  if (!key) return "";
  let result = key.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');
  result = result.trim();
  return result.replace(/\b\w/g, l => l.toUpperCase()).replace(/(\s\w)/g, m => m.toUpperCase());
};

/**
 * Helper function to display individual values, handling boolean, null/undefined, and strings.
 */
const renderSimpleValue = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? "Yes" : "No";
  }
  if (value === "" || value === null || typeof value === 'undefined') {
    return "Not Specified";
  }
  return String(value);
};

/**
 * SectionHeading component for consistent styling.
 */
const SectionHeading = ({ title }: { title: string }) => (
  <h3 className="text-sm font-bold text-black mt-3 mb-1 pt-2 border-t border-neutral-300">{title}</h3>
);

/**
 * RenderDirectProperty: Renders a single property when key and value are known.
 */
const RenderDirectProperty = ({ propertyKey, value }: { propertyKey: keyof FormData | string; value: any }) => {
  let displayVal = renderSimpleValue(value);

  // Currency Formatting for monthlyHoaDues
  if (propertyKey === 'monthlyHoaDues' && displayVal !== "Not Specified") {
    const numericValue = parseFloat(displayVal);
    if (!isNaN(numericValue)) {
      // Assuming monthlyHoaDues can be whole numbers or include cents.
      // Using toFixed(2) for consistency, e.g., $150.00 or $150.50
      displayVal = `$${numericValue.toFixed(2)}`;
    } else {
      displayVal = "Invalid Amount"; // Or keep as "Not Specified" if parsing fails but wasn't initially "Not Specified"
    }
  }

  // Optionally hide "Not Specified" for non-critical, truly optional fields
  const optionalFields = ['monthlyHoaDues', 'specifyOtherFlooringType', 'acTypeOther', 'numberOfFireplaces', 'carportLengthFt', 'carportWidthFt', 'rvPadLengthFt', 'rvPadWidthFt', 'fenceHeight', 'lotNumber', 'additionalPropertyDescription', 'submissionTimestamp', 'submissionId', 'formVersion', 'roofType'];
  if (displayVal === "Not Specified" && optionalFields.includes(propertyKey as string) && propertyKey !== 'monthlyHoaDues') { // Keep monthlyHoaDues if it became "Not Specified" or "Invalid Amount"
    return null;
  }
   // Special handling for monthlyHoaDues if it's "Not Specified" from the start, to avoid rendering it if optionalFields includes it
  if (propertyKey === 'monthlyHoaDues' && renderSimpleValue(value) === "Not Specified" && optionalFields.includes(propertyKey as string)) {
    return null;
  }


  return (
    <div className="py-1">
      <strong className="font-mono text-black">{formatLabel(propertyKey as string)}: </strong>
      <span className="font-mono break-all whitespace-pre-wrap text-neutral-700">
        {displayVal}
      </span>
    </div>
  );
};


/**
 * Helper component/function to render chip-style objects.
 */
const RenderChipGroup = ({ data, label }: { data: Record<string, boolean> | undefined; label: string }) => {
  if (!data) {
    return (
       <div className="py-1">
        <strong className="font-mono text-black">{label}: </strong>
        <span className="font-mono break-all whitespace-pre-wrap text-neutral-700">Not Specified</span>
      </div>
    );
  }
  const selectedItems = Object.entries(data)
    .filter(([,isSelected]) => isSelected)
    .map(([itemKey]) => formatLabel(itemKey));

  return (
    <div className="py-1">
      <strong className="font-mono text-black">{label}: </strong>
      <span className="font-mono break-all whitespace-pre-wrap text-neutral-700">
        {selectedItems.length > 0 ? selectedItems.join(', ') : "None"}
      </span>
    </div>
  );
};

/**
 * Helper for rendering key-value pairs inside complex objects like Room.
 */
const RenderProperty = ({ Rkey, Rvalue }: { Rkey: string; Rvalue: any }) => {
  if (Rkey === 'id' || (typeof Rvalue === 'object' && Rvalue !== null && !Array.isArray(Rvalue))) {
    return null;
  }
  const displayVal = renderSimpleValue(Rvalue);
   // More aggressive filtering for sub-properties within rooms/patios etc.
  if (displayVal === "Not Specified" && !['customRoomName', 'featuresNotes', 'kitchenCabinetSizeOther', 'lengthFt', 'widthFt'].includes(Rkey) ) {
      return null;
  }
   if (displayVal === "Not Specified" && (Rkey === 'lengthFt' || Rkey === 'widthFt') && Rvalue === '') return null;


  return (
    <div className="ml-2">
      <strong className="font-mono text-xs text-black">{formatLabel(Rkey)}: </strong>
      <span className="font-mono text-xs break-all whitespace-pre-wrap text-neutral-700">
        {displayVal}
      </span>
    </div>
  );
};

/**
 * Helper component to render a single Room. (Largely unchanged, uses RenderProperty)
 */
const RenderRoom = ({ room }: { room: Room }) => {
  const roomLabel = room.roomType === 'Other' && room.customRoomName ? room.customRoomName : room.roomType;
  const kitchenExclusions = ['kitchenIsland', 'kitchenRaisedBar', 'kitchenEatIn', 'kitchenWalkInPantry', 'kitchenTileBacksplash', 'kitchenButlersPantry', 'kitchenCabinetSize', 'kitchenCabinetSizeOther', 'kitchenAppliancesColor', 'kitchenFridgeIncluded', 'kitchenFridgeColor', 'kitchenMicrowaveType', 'kitchenDishwasherIncluded', 'kitchenDishwasherColor', 'kitchenDisposal', 'kitchenCompactor', 'kitchenWineCooler', 'kitchenRangeType', 'kitchenCooktopFuel', 'kitchenCooktopStyle', 'kitchenVentHoodType', 'kitchenOutdoorGrill', 'kitchenCountertop'];
  const garageExclusions = ['garageSpaces', 'garageLengthFt', 'garageWidthFt', 'garageDoorOpeners', 'garageIsAttached', 'garageIsFinished', 'garageHasStorage', 'garageHasWorkshop'];
  const primaryBedroomExclusions = ['fan', 'walkInCloset']; // These are specific features of P.Bed
  const bathroomExclusions = ['primaryBathGardenTub', 'primaryBathJets', 'primaryBathWalkInShower', 'primaryBathSeparateVanities']; // Specific to Bathroom or P.Bath
  const utilityRoomExclusions = ['washerDryerHookups']; // Specific to Utility

  let exclusions: string[] = ['id', 'roomType', 'customRoomName', 'featuresNotes', 'lengthFt', 'widthFt', 'floorLevel']; // Basic details rendered first or part of heading

  if (room.roomType === 'Kitchen') exclusions = [...exclusions, ...kitchenExclusions];
  if (room.roomType === 'Garage') exclusions = [...exclusions, ...garageExclusions];
  if (room.roomType === 'Primary Bedroom') exclusions = [...exclusions, ...primaryBedroomExclusions, ...bathroomExclusions]; // P.Bed can have P.Bath features
  if (room.roomType === 'Bathroom') exclusions = [...exclusions, ...bathroomExclusions];
  if (room.roomType === 'Utility Room') exclusions = [...exclusions, ...utilityRoomExclusions];
  
  return (
    <div className="my-2 p-2 border border-neutral-400 bg-neutral-50 rounded-none">
      <h4 className="font-bold text-sm text-black underline">{formatLabel(roomLabel)}</h4>
      <RenderProperty Rkey="lengthFt" Rvalue={room.lengthFt} />
      <RenderProperty Rkey="widthFt" Rvalue={room.widthFt} />
      <RenderProperty Rkey="floorLevel" Rvalue={room.floorLevel} />
      
      {Object.entries(room).map(([key, value]) => {
        if (exclusions.includes(key)) return null;
        return <RenderProperty key={key} Rkey={key} Rvalue={value} />;
      })}

      {room.roomType === 'Kitchen' && (
        <>
          <RenderProperty Rkey="kitchenCountertop" Rvalue={room.kitchenCountertop} />
          <RenderProperty Rkey="kitchenIsland" Rvalue={room.kitchenIsland} />
          <RenderProperty Rkey="kitchenRaisedBar" Rvalue={room.kitchenRaisedBar} />
          {/* ... other kitchen properties ... complete as per previous version */}
          {room.kitchenCabinetSize && <RenderChipGroup data={room.kitchenCabinetSize as Record<string,boolean>} label={formatLabel("kitchenCabinetSize")} />}
          {room.kitchenCabinetSize?.other && <RenderProperty Rkey="kitchenCabinetSizeOther" Rvalue={room.kitchenCabinetSizeOther} />}
          <RenderProperty Rkey="kitchenAppliancesColor" Rvalue={room.kitchenAppliancesColor} />
          <RenderProperty Rkey="kitchenFridgeIncluded" Rvalue={room.kitchenFridgeIncluded} />
          {room.kitchenFridgeIncluded === 'Yes' && <RenderProperty Rkey="kitchenFridgeColor" Rvalue={room.kitchenFridgeColor} />}
          <RenderProperty Rkey="kitchenMicrowaveType" Rvalue={room.kitchenMicrowaveType} />
          <RenderProperty Rkey="kitchenDishwasherIncluded" Rvalue={room.kitchenDishwasherIncluded} />
          <RenderProperty Rkey="kitchenDisposal" Rvalue={room.kitchenDisposal} />
          {room.kitchenRangeType && <RenderChipGroup data={room.kitchenRangeType as Record<string,boolean>} label={formatLabel("kitchenRangeType")} />}
           {/* Add other specific kitchen fields here from previous version */}
        </>
      )}
      {room.roomType === 'Garage' && (
        <>
          <RenderProperty Rkey="garageSpaces" Rvalue={room.garageSpaces} />
          {/* ... other garage properties ... */}
          <RenderProperty Rkey="garageIsAttached" Rvalue={room.garageIsAttached} />
          <RenderProperty Rkey="garageIsFinished" Rvalue={room.garageIsFinished} />
        </>
      )}
      {(room.roomType === 'Primary Bedroom') && (
        <>
            <RenderProperty Rkey="fan" Rvalue={room.fan} />
            <RenderProperty Rkey="walkInCloset" Rvalue={room.walkInCloset} />
        </>
      )}
      {(room.roomType === 'Bathroom' || room.roomType === 'Primary Bedroom') && (
        <>
            <RenderProperty Rkey="primaryBathGardenTub" Rvalue={room.primaryBathGardenTub} />
            {/* ... other bathroom properties ... */}
            <RenderProperty Rkey="primaryBathSeparateVanities" Rvalue={room.primaryBathSeparateVanities} />
        </>
      )}
      {room.roomType === 'Utility Room' && (
        <RenderProperty Rkey="washerDryerHookups" Rvalue={room.washerDryerHookups} />
      )}
      {room.featuresNotes && <RenderProperty Rkey="featuresNotes" Rvalue={room.featuresNotes} />}
    </div>
  );
};

const RenderPatio = ({ patio, index }: { patio: Patio; index: number }) => (
  <div className="my-2 p-2 border border-neutral-400 bg-neutral-50 rounded-none">
    <h4 className="font-bold text-sm text-black underline">Patio {index + 1} Details</h4>
    <RenderProperty Rkey="lengthFt" Rvalue={patio.lengthFt} />
    <RenderProperty Rkey="widthFt" Rvalue={patio.widthFt} />
    <RenderProperty Rkey="isCovered" Rvalue={patio.isCovered} />
    <RenderProperty Rkey="isUncovered" Rvalue={patio.isUncovered} />
    <RenderProperty Rkey="isConcrete" Rvalue={patio.isConcrete} />
    <RenderProperty Rkey="isPavers" Rvalue={patio.isPavers} />
    <RenderProperty Rkey="isGravel" Rvalue={patio.isGravel} />
  </div>
);

const RenderShed = ({ shed, index }: { shed: Shed; index: number }) => (
  <div className="my-2 p-2 border border-neutral-400 bg-neutral-50 rounded-none">
    <h4 className="font-bold text-sm text-black underline">Shed {index + 1} Details</h4>
    <RenderProperty Rkey="lengthFt" Rvalue={shed.lengthFt} />
    <RenderProperty Rkey="widthFt" Rvalue={shed.widthFt} />
  </div>
);

export default function ReviewCard({ formData }: { formData: FormData }) {
  return (
    <div className="bg-neutral-100 p-4 border-2 border-black shadow-[4px_4px_0px_#000000] max-h-[400px] overflow-y-auto space-y-1 text-xs rounded-none">
      
      <SectionHeading title="Property Information" />
      <RenderDirectProperty propertyKey="streetAddress" value={formData.streetAddress} />
      <RenderDirectProperty propertyKey="city" value={formData.city} />
      <RenderDirectProperty propertyKey="state" value={formData.state} />
      <RenderDirectProperty propertyKey="zipCode" value={formData.zipCode} />
      <RenderDirectProperty propertyKey="propertyType" value={formData.propertyType} />

      <SectionHeading title="Key Property Metrics" />
      <RenderDirectProperty propertyKey="totalBedrooms" value={formData.totalBedrooms} />
      <RenderDirectProperty propertyKey="totalBathrooms" value={formData.totalBathrooms} />

      <SectionHeading title="Exterior & Construction" />
      <RenderChipGroup data={formData.exteriorFeatures} label={formatLabel("exteriorFeatures")} />
      <RenderDirectProperty propertyKey="roofType" value={formData.roofType} />
      
      <SectionHeading title="HOA Details" />
      <RenderDirectProperty propertyKey="hoa" value={formData.hoa} />
      {formData.hoa === 'Yes' && <RenderDirectProperty propertyKey="monthlyHoaDues" value={formData.monthlyHoaDues} />}

      <SectionHeading title="Rooms" />
      {formData.rooms && formData.rooms.length > 0 ? (
        formData.rooms.map((room) => <RenderRoom key={room.id} room={room} />)
      ) : (
        <p className="ml-2 text-neutral-600">No rooms specified.</p>
      )}

      <SectionHeading title="Flooring" />
      <RenderChipGroup data={formData.flooringTypes} label={formatLabel("flooringTypes")} />
      <RenderDirectProperty propertyKey="specifyOtherFlooringType" value={formData.specifyOtherFlooringType} />


      <SectionHeading title="Systems & Utilities" />
      <RenderDirectProperty propertyKey="waterHeaterType" value={formData.waterHeaterType} />
      <RenderDirectProperty propertyKey="acType" value={formData.acType} />
      {formData.acType === 'Other' && <RenderDirectProperty propertyKey="acTypeOther" value={formData.acTypeOther} />}
      <RenderDirectProperty propertyKey="heatType" value={formData.heatType} />
      <RenderDirectProperty propertyKey="sprinklerSystem" value={formData.sprinklerSystem} />
      <RenderDirectProperty propertyKey="alarmSystem" value={formData.alarmSystem} />
      <RenderDirectProperty propertyKey="numberOfSmokeDetectors" value={formData.numberOfSmokeDetectors} />
      <RenderDirectProperty propertyKey="programmableThermostat" value={formData.programmableThermostat} />

      <SectionHeading title="Fireplace" />
      <RenderDirectProperty propertyKey="hasFireplace" value={formData.hasFireplace} />
      {formData.hasFireplace === 'Yes' && (
        <>
          <RenderDirectProperty propertyKey="numberOfFireplaces" value={formData.numberOfFireplaces} />
          <RenderChipGroup data={formData.fireplaceFeatures} label={formatLabel("fireplaceFeatures")} />
        </>
      )}

      <SectionHeading title="Outdoor Structures" />
      <RenderDirectProperty propertyKey="hasPatios" value={formData.hasPatios} />
      {formData.hasPatios === 'Yes' && formData.patios && formData.patios.length > 0 ? (
        formData.patios.map((patio, index) => <RenderPatio key={patio.id} patio={patio} index={index} />)
      ) : (
        formData.hasPatios === 'Yes' && <p className="ml-2 text-neutral-600">No patios specified.</p>
      )}
      <RenderDirectProperty propertyKey="hasSheds" value={formData.hasSheds} />
      {formData.hasSheds === 'Yes' && formData.sheds && formData.sheds.length > 0 ? (
        formData.sheds.map((shed, index) => <RenderShed key={shed.id} shed={shed} index={index} />)
      ) : (
         formData.hasSheds === 'Yes' && <p className="ml-2 text-neutral-600">No sheds specified.</p>
      )}
      <RenderDirectProperty propertyKey="carport" value={formData.carport} />
      {formData.carport === 'Yes' && (
        <>
          <RenderDirectProperty propertyKey="carportLengthFt" value={formData.carportLengthFt} />
          <RenderDirectProperty propertyKey="carportWidthFt" value={formData.carportWidthFt} />
        </>
      )}
      <RenderDirectProperty propertyKey="rvPad" value={formData.rvPad} />
      {formData.rvPad === 'Yes' && (
        <>
          <RenderDirectProperty propertyKey="rvPadLengthFt" value={formData.rvPadLengthFt} />
          <RenderDirectProperty propertyKey="rvPadWidthFt" value={formData.rvPadWidthFt} />
        </>
      )}
      <RenderDirectProperty propertyKey="deck" value={formData.deck} />
      
      <SectionHeading title="Lot & Community" />
      <RenderDirectProperty propertyKey="lotNumber" value={formData.lotNumber} />
      <RenderChipGroup data={formData.yardFeatures} label={formatLabel("yardFeatures")} />
      <RenderDirectProperty propertyKey="fenceHeight" value={formData.fenceHeight} />
      <RenderChipGroup data={formData.fenceMaterials} label={formatLabel("fenceMaterials")} />
      <RenderChipGroup data={formData.communityAmenities} label={formatLabel("communityAmenities")} />

      <SectionHeading title="Additional Notes" />
      <RenderDirectProperty propertyKey="additionalPropertyDescription" value={formData.additionalPropertyDescription} />

      {/* Fallback for any fields not explicitly placed - useful for debugging during development */}
      {/* <SectionHeading title="Other Details" />
      {Object.entries(formData)
        .filter(([key]) => ![
          'streetAddress', 'city', 'state', 'zipCode', 'propertyType', 'totalBedrooms', 'totalBathrooms',
          'exteriorFeatures', 'roofType', 'hoa', 'monthlyHoaDues', 'rooms', 'flooringTypes', 'specifyOtherFlooringType',
          'waterHeaterType', 'acType', 'acTypeOther', 'heatType', 'sprinklerSystem', 'alarmSystem', 'numberOfSmokeDetectors', 'programmableThermostat',
          'hasFireplace', 'numberOfFireplaces', 'fireplaceFeatures', 'hasPatios', 'patios', 'hasSheds', 'sheds',
          'carport', 'carportLengthFt', 'carportWidthFt', 'rvPad', 'rvPadLengthFt', 'rvPadWidthFt', 'deck',
          'lotNumber', 'yardFeatures', 'fenceHeight', 'fenceMaterials', 'communityAmenities', 'additionalPropertyDescription',
          // Also exclude keys that are objects/arrays handled by custom renderers if they were to be missed
          'submissionTimestamp', 'submissionId', 'formVersion' // Meta fields
        ].includes(key))
        .map(([key, value]) => (
          <RenderDirectProperty key={key} propertyKey={key} value={value} />
      ))} */}

    </div>
  );
}
