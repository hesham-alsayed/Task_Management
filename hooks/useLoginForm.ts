"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/store/hooks";
import { loginUser } from "@/app/store/features/auth/authThunks";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

type ApiResponse = {
  success: boolean;
  message?: string;
  user?: unknown;
};

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch() 

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  
  const onSubmit = async (data: LoginFormData) => {
  try {
    setIsLoading(true);

    await dispatch(loginUser(data)).unwrap();

    toast.success("Logged in successfully");
    router.push("/projects");
  } catch (err) {
    toast.error(
      typeof err === "string"
        ? err
        : "Invalid credentials"
    );
  } finally {
    setIsLoading(false);
  }
};
  return {
    form,
    onSubmit,
    isLoading,
  };
}
