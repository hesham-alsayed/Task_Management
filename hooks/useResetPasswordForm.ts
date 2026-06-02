"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// rules will check it with the password input and return true/false
const passwordRules = {
  length: (v: string) => v.length >= 8 && v.length <= 64,
  lowercase: (v: string) => /[a-z]/.test(v),
  uppercase: (v: string) => /[A-Z]/.test(v),
  digit: (v: string) => /\d/.test(v),
  special: (v: string) => /[!@#$%^&*]/.test(v),
};

// zod schema for validation
const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(64, { message: "Password must be less than 64 characters" })
      .refine(passwordRules.lowercase, "Lowercase required")
      .refine(passwordRules.uppercase, "Uppercase required")
      .refine(passwordRules.digit, "Digit required")
      .refine(passwordRules.special, "Special char required"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// type for form data based on the zod schema

export type ResetPasswordFormData = z.infer<typeof schema>;

//  type for requirements
export type RequirementItem = {
  text: string;
  valid: boolean;
};

// custom hook
export function useResetPasswordForm(token?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password") || "";

  // requirements for password validation,
  const requirements = useMemo(
    () => ({
      desktop: [
        {
          text: "8–64 characters",
          valid: passwordRules.length(password),
        },
        {
          text: "Lowercase letter",
          valid: passwordRules.lowercase(password),
        },
        {
          text: "Uppercase letter",
          valid: passwordRules.uppercase(password),
        },
        {
          text: "One digit",
          valid: passwordRules.digit(password),
        },
        {
          text: "Special character",
          valid: passwordRules.special(password),
        },
      ] as RequirementItem[],

      mobile: [
        {
          text: "Uppercase & lowercase",
          valid:
            passwordRules.uppercase(password) &&
            passwordRules.lowercase(password),
        },
        {
          text: "8–64 characters",
          valid: passwordRules.length(password),
        },
        {
          text: "At least one digit",
          valid: passwordRules.digit(password),
        },
        {
          text: "Special character (e.g. !@#$)",
          valid: passwordRules.special(password),
        },
      ] as RequirementItem[],
    }),
    [password],
  );

  // update password function
  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);

      if (!token) {
        toast.error("Invalid or expired reset link");
        return;
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed");
      }

      toast.success(
        "Your password has been updated successfully. You can now log in.",
      );
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    requirements,
  };
}
