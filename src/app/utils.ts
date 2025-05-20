import { Room } from "@/interfaces";

/**
 * Ensures that kitchenCabinetSize always has the correct structure when updating room fields
 * @param roomId The ID of the room being updated
 * @param fieldName The field name being updated
 * @param value The new value for the field
 * @param rooms The current rooms array
 * @returns Updated rooms array with type-safe values
 */
export function ensureTypeSafeRoomUpdate(
  roomId: string,
  fieldName: keyof Room,
  value: string | number | boolean | Record<string, boolean>,
  rooms: Room[]
): Room[] {
  return rooms.map(room => {
    if (room.id === roomId) {
      // Special handling for kitchenCabinetSize to ensure it always has the correct structure
      if (fieldName === 'kitchenCabinetSize' && typeof value === 'object') {
        // Ensure the object has all required properties with boolean values
        const safeKitchenCabinetSize: Room['kitchenCabinetSize'] = {
          s30inch: false,
          s36inch: false,
          s42inch: false,
          custom: false,
          other: false,
          ...value // Spread the incoming values, but only after ensuring defaults
        };
        
        return {
          ...room,
          [fieldName]: safeKitchenCabinetSize
        };
      }
      
      // For other fields, just update normally
      return {
        ...room,
        [fieldName]: value
      };
    }
    return room;
  });
}

/**
 * Ensures that chip group toggles maintain type safety
 * @param roomId The ID of the room being updated
 * @param fieldName The field name being updated
 * @param key The key within the field to toggle
 * @param currentValue The current value of the field
 * @returns A type-safe updated value
 */
export function ensureTypeSafeChipToggle(
  roomId: string,
  fieldName: keyof Pick<Room, 'kitchenRangeType' | 'kitchenCabinetSize'>,
  key: string,
  currentValue: Record<string, boolean>
): Record<string, boolean> {
  const updatedValue = {
    ...currentValue,
    [key]: !currentValue[key]
  };
  
  // Special handling for kitchenCabinetSize
  if (fieldName === 'kitchenCabinetSize') {
    return {
      s30inch: false,
      s36inch: false,
      s42inch: false,
      custom: false,
      other: false,
      ...updatedValue
    };
  }
  
  return updatedValue;
}
