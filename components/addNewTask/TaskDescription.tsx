"use client";

import React from "react";

type Props = {
  register: any;
};

export default function TaskDescription({ register }: Props) {
  return (
    <div>
      <p className="uppercase text-[11px] font-bold text-[#4F5F7B]">
        Description
      </p>

      <textarea
        {...register("description")}
        className="input-form min-h-25 max-h-35"
        placeholder="Provide detailed context for this task..."
      />
    </div>
  );
}
