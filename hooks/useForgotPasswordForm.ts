"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { forgotPasswordAction } from "@/app/server-actions/auth/forgotPassword";

const schema = z.object({
  email: z.string().email("Invalid email format"),
});

export type ForgotFormData = z.infer<typeof schema>;

const RESEND_TIME = 300; // 5 min
const MAX_TRIES = 3;

export function useForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [tries, setTries] = useState(0);

  // const emailRef = useRef<string>("");

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

 const sendRequest = async (email: string) => {
  const result = await forgotPasswordAction({ email });
  return result;
};

  const canSubmit = !isLoading && timeLeft === 0 && tries < MAX_TRIES;
  const canResend =
    isSuccess && !isLoading && timeLeft === 0 && tries < MAX_TRIES;

  const onSubmit = async (data: ForgotFormData) => {
    try {
      setIsLoading(true);

      // emailRef.current = data.email;

      await sendRequest(data.email);

      setIsSuccess(true);
      setTimeLeft(RESEND_TIME);
      setTries(1);
    } catch (error) { 
      console.log(error)
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= TIMER =================
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // ================= RESEND =================
  const handleResend = async () => {
    if (!canResend) return;

    try {
      setIsLoading(true);

      const email = form.getValues("email");

      const result = await sendRequest(email);

      toast.success(result.message);

      setTries((t) => t + 1);
      setTimeLeft(RESEND_TIME);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0",
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  return {
    form,
    onSubmit,
    isLoading,
    isSuccess,
    handleResend,
    canResend,
    canSubmit,
    formattedTime,
    tries,
  };
}
