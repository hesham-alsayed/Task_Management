"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hooks";
import { signupUser } from "@/app/store/features/auth/authThunks";

const nameRegex: RegExp = /^[A-Za-z]+( [A-Za-z]+)*$/;

const passwordRules = {
  length: (v: string): boolean => v.length >= 8,
  complexity: (v: string): boolean => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v),
  special: (v: string): boolean => /[!@#$%^&*]/.test(v),
} as const;

const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(nameRegex, "Invalid name format"),

    email: z.string().email("Invalid email format"),

    jobTitle: z
      .string()
      .optional()
      .refine(
        (v) => !v || /^[A-Za-z ]+$/.test(v),
        "Job title must contain only letters and spaces",
      ),

    password: z
      .string()
      .min(8, "Min 8 characters")
      .max(64, "Max 64 characters")
      .refine(
        (v) => passwordRules.complexity(v),
        "Must include uppercase, lowercase and number",
      )
      .refine(
        (v) => passwordRules.special(v),
        "Must include special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;

type Requirement = {
  text: string;
  valid: boolean;
};

const getRequirements = (password: string): Requirement[] => [
  {
    text: "At least 8 characters",
    valid: passwordRules.length(password),
  },
  {
    text: "One uppercase, lowercase, and digit",
    valid: passwordRules.complexity(password),
  },
  {
    text: "One special character",
    valid: passwordRules.special(password),
  },
];

export function useSignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch() 
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      jobTitle: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = form.watch("password") || "";

  const requirements = useMemo(() => getRequirements(password), [password]);
const onSubmit = async (data: SignupFormData) => {
  try {
    setIsLoading(true);

    const body = {
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        jobTitle: data.jobTitle,
      },
    };

    await dispatch(signupUser(body)).unwrap();
    toast.success("Account created successfully");
    router.push("/projects");
  } catch (err) { 
    console.log(err)
    toast.error(typeof err === "string" ? err : "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};
  return {
    form,
    onSubmit,
    requirements,
    isLoading,
  };
}
