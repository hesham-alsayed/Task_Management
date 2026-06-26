"use client";

import { useResetPasswordForm } from "@/hooks/useResetPasswordForm";
import PasswordInput from "./PasswordInput";
import PasswordRequirements from "./PasswordRequirements";
import SubmitSection from "./SubmitSection";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
  const token = searchParams.get("access_token") || "";
  const { form, onSubmit, requirements, isLoading } = useResetPasswordForm(token);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
  
  return (
    <div className="h-full rounded-lg p-4 max-sm:w-[390px] sm:w-[512px] max-h-[678px] sm:shadow-[0px_24px_48px_0px_#041B3C0F] sm:p-8 mb-40 sm:mt-10 sm:bg-[#FFFFFF]">
      {/* HEADER */}
      <div className="header space-y-2 flex flex-col items-center sm:items-start">
        <h1 className="text-[24px] text-[#041B3C] font-semibold">
          Create a New Password
        </h1>

        <span className="text-[14px] max-sm:text-center text-[#434654] font-normal">
          Create a new, strong password to secure your workstation access.
        </span>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 max-sm:p-4 max-sm:bg-[#FFFFFF] max-sm:shadow-[0px_24px_48px_0px_#041B3C0F] space-y-6"
      >
        {/* INPUT */}
        <PasswordInput
          register={register}
          isSubmitted={isSubmitted}
          errors={errors}
        />

        {/* REQUIREMENTS */}
        <PasswordRequirements requirements={requirements} />

        {/* SUBMIT */}
        <SubmitSection isLoading={isLoading} />
      </form>
    </div>
  );
}
