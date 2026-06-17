"use client";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

type Props = {
  control: any;
  epicOptions: any[];
  selectStyles: any;
};

export default function EpicSelect({
  control,
  epicOptions,
  selectStyles,
}: Props) {
  return (
    <div>
      <label className="label-form">Epic</label>

      <Controller
        control={control}
        name="epic_id"
        render={({ field }) => (
          <Select
            options={epicOptions}
            instanceId="task-epic"
            placeholder="Select Epic"
            styles={selectStyles}
            value={
              epicOptions.find(
                (i) => String(i.value) === String(field.value),
              ) || null
            }
            onChange={(option) => field.onChange(option?.value)}
          />
        )}
      />
    </div>
  );
}
