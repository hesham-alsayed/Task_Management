"use client";

import React from "react";

type Props = {
  register: any;
  errors: any;
  isSubmitted: boolean;
};

export default function TaskTitleInput({
  register,
  errors,
  isSubmitted,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="label-form" htmlFor="title">
        title <span className="text-[#BA1A1A]">*</span>
      </label>

      <input
        {...register("title")}
        placeholder="Enter Task title"
        type="text"
        id="title"
        className="input-form w-full"
      />

      {errors.title && isSubmitted && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  );
}