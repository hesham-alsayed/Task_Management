"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      console.log(response);

      const result: ApiResponse = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      toast.success("Login successful");

      router.push("/");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
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
