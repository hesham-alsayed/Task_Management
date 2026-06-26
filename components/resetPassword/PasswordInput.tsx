"use client";

import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import EyeIcon from "../icons/EyeIcon";
import EyeOffIcon from "../icons/EyeOffIcon";

type FormValues = {
  password: string;
  confirmPassword: string;
};

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  isSubmitted: boolean;
};

export default function PasswordInput({
  register,
  errors,
  isSubmitted,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* New Password */}
      <div>
        <label className="label-form text-[11px] font-bold">New Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input-form border border-[#C3C6D64D] bg-[#F1F3FF]"
            placeholder="Enter your new password"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {isSubmitted && errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="label-form text-[11px] font-bold">
          Confirm Password
        </label>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input-form border border-[#C3C6D64D] bg-[#F1F3FF]"
            placeholder="Repeat your new password"
            {...register("confirmPassword")}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {isSubmitted && errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {String(errors.confirmPassword.message)}
          </p>
        )}
      </div>
    </>
  );
}
