"use client";

import React from "react";
import type { StepProps } from "@/interfaces";
import { StyledTextarea } from "@/components/form-elements/StyledTextarea";

/******************************************************************************************
 *  Step 7 – Additional Information & Full Review                                          *
 * --------------------------------------------------------------------------------------- *
 *  • Accepts the *entire* cleaned formData object (see sample JSON).                      *
 *  • Dynamically converts every top-level field into a human-friendly review list.         *
 *  • Handles nested arrays / objects (rooms, patios, sheds…) with expandable subsections.  *
 *  • ZERO hard-coded field names — add a new question and it auto-appears here.            *
 ******************************************************************************************/

// ✂───────── Utility helpers ───────────────────────────────────────────────────────────────

/** Transform camelCase / snake_case / spaced labels → "Title Case" */
function prettifyLabel(label: string) {
  return label
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")  // camelCase → camel Case
    .replace(/_/g, " ")                      // snake_case → snake case
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Render primitives nicely */
function formatValue(value: any): string | number | JSX.Element {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return ""; // handled at a deeper level
  return value;
}

/** Recursively turns any JSON structure into <ul>/<li> blocks */
function RecursiveList({ data }: { data: any }) {
  if (data === null || data === undefined || data === "") return null;
  if (Array.isArray(data)) {
    return (
      <ul className="ml-4 list-disc space-y-0.5">
        {data.map((item, idx) => (
          <li key={idx} className="">{
            typeof item === "object" ? <RecursiveList data={item} /> : item.toString()
          }</li>
        ))}
      </ul>
    );
  }
  if (typeof data === "object") {
    return (
      <ul className="ml-4 list-disc space-y-0.5">
        {Object.entries(data).map(([k, v]) => (
          <li key={k}>
            <span className="font-semibold">{prettifyLabel(k)}: </span>
            {typeof v === "object" ? <RecursiveList data={v} /> : formatValue(v)}
          </li>
        ))}
      </ul>
    );
  }
  return <>{formatValue(data)}</>;
}

// ✂───────── Main component ───────────────────────────────────────────────────────────────

export default function Step7AdditionalInfo({ formData, handleChange }: StepProps) {
  /**
   * Build “sections” dynamically: each top-level key becomes a section unless
   * it’s the additional notes field (that stays separate) or empty.
   */
  const sections = React.useMemo(() => {
    const omit = new Set(["additionalPropertyDescription"]);
    return Object.entries(formData)
      .filter(([, v]) => v !== undefined && v !== null && v !== "" && !omit.has(v as string))
      .map(([key, value]) => ({ key, value }));
  }, [formData]);

  return (
    <div className="space-y-6">
      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-6">
        Additional Information
      </h2>

      {/* ── Free-text notes field ───────────────────────────────────────── */}
      <StyledTextarea
        label="Additional Property Description"
        name="additionalPropertyDescription"
        value={formData.additionalPropertyDescription}
        onChange={handleChange}
        placeholder="Provide any other relevant details about the property…"
        rows={6}
      />

      {/* ── Review & Submit card ─────────────────────────────────────────── */}
      <div className="mt-6 p-4 border-2 border-black bg-card shadow-[2px_2px_0_theme(colors.black)]">
        <h3 className="text-lg font-semibold mb-4">Review &amp; Submit</h3>

        {sections.map(({ key, value }) => (
          <div key={key} className="mb-4 first:mt-0">
            <h4 className="font-bold">{prettifyLabel(key)}</h4>
            {typeof value === "object" ? (
              <RecursiveList data={value} />
            ) : (
              <p className="ml-4 text-muted-foreground">{formatValue(value)}</p>
            )}
          </div>
        ))}

        <p className="mt-4 text-sm">
          Ready to go? Click <span className="font-semibold">Submit</span> below to finalise your entry.
        </p>
      </div>
    </div>
  );
}
