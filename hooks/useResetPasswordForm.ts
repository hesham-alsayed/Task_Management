"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/app/server-actions/auth/resetPassword";

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


export type ResetPasswordFormData = z.infer<typeof schema>;

export type RequirementItem = {
  text: string;
  valid: boolean;
};


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

 const onSubmit = async (data: ResetPasswordFormData) => {
  try {
    setIsLoading(true);

    if (!token) {
      toast.error("Token not found or invalid");
      return;
    }

    const result = await resetPasswordAction({
      password: data.password,
      token,
    });

    toast.success(result.message);

    setTimeout(() => {
      router.replace("/login");
    }, 3000);
  } catch (error: any) {
    toast.error(error.message || error.msg || "Failed to update password");
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
