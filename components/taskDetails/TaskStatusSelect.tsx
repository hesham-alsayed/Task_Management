"use client";
import { statusTasksOptions } from "@/lib/constant";
import React from "react";
import Select from "react-select";

export default function TaskStatusSelect() {
  return (
    <div>
      <span
        style={{
          lineHeight: "16px",
          letterSpacing: "1px",
        }}
        className="text-[#434654] mb-6 font-bold text-[11px] uppercase"
      >
        status
      </span>
      <div className="pt-3">
        <Select
          options={statusTasksOptions}
          defaultValue={statusTasksOptions[0]}
          styles={{
            control: (base: any, state: any) => ({
              ...base,
              boxShadow: "none",
              minHeight: "40px",
              height: "40px",
              borderRadius: "2px",
              cursor: "pointer",

              backgroundColor: state.getValue()?.[0]?.bg || "#E8EDFF",
            }),

            valueContainer: (base: any) => ({
              ...base,
              padding: "0 10px",
            }),

            indicatorsContainer: (base: any) => ({
              ...base,
              height: "40px",
            }),

            indicatorSeparator: () => ({
              display: "none",
            }),

            singleValue: (base: any, state: any) => ({
              ...base,
              color: "##002113",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "upperCase",
            }),
          }}
        />
      </div>
    </div>
  );
}
