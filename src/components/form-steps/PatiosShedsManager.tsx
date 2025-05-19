// src/components/form-steps/PatiosShedsManager.tsx
"use client";
import type { StepProps, Patio, Shed } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { StyledInput } from "@/components/form-elements/StyledInput";
import { StyledRadioGroup } from "@/components/form-elements/StyledRadioGroup";
import { ChipButton } from "@/components/form-elements/ChipButton";
import { PlusCircle, Trash2 } from "lucide-react";
import { yesNoOptions } from "@/data/form-options";

export default function PatiosShedsManager({
  formData,
  handleChange,
  addPatio,
  handlePatioChange,
  removePatio,
  addShed,
  handleShedChange,
  removeShed,
}: StepProps) {

  return (
    <>
      {/* Patios Section */}
      <div className="mt-6 pt-4 border-t border-black">
        <h3 className="text-xl font-semibold mb-3">Patios</h3>
        <StyledRadioGroup
          label="Are there any patios?"
          name="hasPatios"
          options={yesNoOptions}
          value={formData.hasPatios}
          onValueChange={(value) => handleChange({ target: { name: 'hasPatios', value } } as any)}
        />
        {formData.hasPatios === 'Yes' && (
          <div className="space-y-4">
            {formData.patios.map((patio, index) => (
              <div key={patio.id} className="p-4 border-2 border-black shadow-[2px_2px_0px_theme(colors.black)] bg-card space-y-3">
                <h4 className="font-medium text-md">Patio {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <StyledInput
                    label="Length (ft)"
                    type="number"
                    value={patio.lengthFt}
                    onChange={(e) => handlePatioChange(patio.id, 'lengthFt', e.target.value)}
                    placeholder="e.g., 10"
                  />
                  <StyledInput
                    label="Width (ft)"
                    type="number"
                    value={patio.widthFt}
                    onChange={(e) => handlePatioChange(patio.id, 'widthFt', e.target.value)}
                    placeholder="e.g., 12"
                  />
                </div>
                <div className="font-medium text-sm mb-1">Patio Features:</div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(patio) as Array<keyof Patio>)
                    .filter(k => k.startsWith('is'))
                    .map(key => (
                    <ChipButton
                      key={key}
                      isActive={!!patio[key]}
                      onClick={() => handlePatioChange(patio.id, key, !patio[key])}
                    >
                      {key.substring(2).replace(/([A-Z])/g, ' $1').trim()} {/* Converts isConcrete to Concrete */}
                    </ChipButton>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removePatio(patio.id)}
                  className="neubrutalism-button text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove Patio {index + 1}
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addPatio} className="neubrutalism-button bg-secondary text-secondary-foreground hover:bg-secondary/80">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Patio
            </Button>
          </div>
        )}
      </div>

      {/* Sheds Section */}
      <div className="mt-6 pt-4 border-t border-black">
        <h3 className="text-xl font-semibold mb-3">Sheds</h3>
        <StyledRadioGroup
          label="Are there any sheds?"
          name="hasSheds"
          options={yesNoOptions}
          value={formData.hasSheds}
          onValueChange={(value) => handleChange({ target: { name: 'hasSheds', value } } as any)}
        />
        {formData.hasSheds === 'Yes' && (
          <div className="space-y-4">
            {formData.sheds.map((shed, index) => (
              <div key={shed.id} className="p-4 border-2 border-black shadow-[2px_2px_0px_theme(colors.black)] bg-card space-y-3">
                <h4 className="font-medium text-md">Shed {index + 1}</h4>
                <div className="grid grid-cols-2 gap-4">
                   <StyledInput
                    label="Length (ft)"
                    type="number"
                    value={shed.lengthFt}
                    onChange={(e) => handleShedChange(shed.id, 'lengthFt', e.target.value)}
                    placeholder="e.g., 8"
                  />
                  <StyledInput
                    label="Width (ft)"
                    type="number"
                    value={shed.widthFt}
                    onChange={(e) => handleShedChange(shed.id, 'widthFt', e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeShed(shed.id)}
                  className="neubrutalism-button text-sm"
                >
                   <Trash2 className="h-4 w-4 mr-2" /> Remove Shed {index + 1}
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addShed} className="neubrutalism-button bg-secondary text-secondary-foreground hover:bg-secondary/80">
               <PlusCircle className="h-4 w-4 mr-2" /> Add Shed
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
