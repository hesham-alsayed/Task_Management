"use client";

import { statusEpicOptions } from "@/lib/constant";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

type Props = {
  control: any;
  selectStyles: any;
};

export default function StatusSelect({ control, selectStyles }: Props) {
  return (
    <div>
      <label className="label-form">Status</label>

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select
            options={statusEpicOptions}
            instanceId="task-status"
            placeholder="Select Status"
            styles={selectStyles}
            value={
              statusEpicOptions.find((i:any) => i.value === field.value) || null
            }
            onChange={(option) => field.onChange(option?.value)}
          />
        )}
      />
    </div>
  );
}
