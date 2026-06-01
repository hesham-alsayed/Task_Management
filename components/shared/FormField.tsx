"use client";

import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import EyeOffIcon from "../icons/EyeOffIcon";
import EyeIcon from "../icons/EyeIcon";
import Link from "next/link";
import EmailIcon from "../icons/EmailIcon";
import LockIcon from "../icons/LockIcon";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  mode?: string;
};

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  helperText,
  error,
  register,
  mode,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="label-form">
          {mode === "login" && id === "email" ? (
            <>
              <span className="block sm:hidden">Email Address</span>
              <span className="hidden sm:block">Email</span>
            </>
          ) : (
            label
          )}
        </label>
        {mode === "login" && id === "password" && (
          <Link
            className="font-semibold text-[11px] text-primary sm:hidden"
            href="/forgot-password"
          >
            Forgot?
          </Link>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type={isPasswordField && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={
            id === "email"
              ? "email"
              : id === "password"
                ? "current-password"
                : undefined
          }
          className={`input-form pr-10 ${error ? "border-red-500" : ""}`}
          {...register}
        />

        {/* EMAIL ICON */}
        {mode === "login" && id === "email" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:hidden">
            <EmailIcon />
          </div>
        )}

        {/* PASSWORD ICONS */}
        {isPasswordField && (
          <>
            {/* MOBILE: lock icon */}
            {mode === "login" && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:hidden">
                <LockIcon />
              </div>
            )}

            {/* DESKTOP: eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:block"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-350 pt-2">{helperText}</p>
      ) : null}
    </div>
  );
}
