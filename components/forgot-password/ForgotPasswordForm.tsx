"use client";

import { useForgotPasswordForm } from "@/hooks/useForgotPasswordForm";

import ForgotHeader from "./ForgotHeader";
import EmailField from "./EmailField";
import SubmitButton from "./SubmitButton";
import BackLink from "./BackLink";
import SuccessMessage from "./SuccessMessage";
import SuccessStateMobile from "./SuccessStateMobile";

export default function ForgotPasswordForm() {
  const {
    form,
    onSubmit,
    isLoading,
    isSuccess,
    handleResend,
    canResend,
    canSubmit,
    formattedTime,
  } = useForgotPasswordForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className=" w-full flex justify-center max-w-md  mt-10 mb-40 ">
      <div className="w-full hidden sm:block  max-h-[615px] bg-background rounded-lg p-10 space-y-6 shadow-[0px_24px_48px_0px_#041B3C0F]">
        <ForgotHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <EmailField register={register} errors={errors} />

          <SubmitButton isLoading={isLoading} canSubmit={canSubmit} />

          <BackLink />

          <SuccessMessage
            isSuccess={isSuccess}
            handleResend={handleResend}
            canResend={canResend}
            formattedTime={formattedTime}
          />
        </form>
      </div>
      <div className="w-full sm:hidden max-w-[342px] flex flex-col gap-6">
        <div className="h-full bg-background max-h-[579px] rounded-lg p-6 space-y-6 shadow-[0px_24px_48px_0px_#041B3C0F]">
          <ForgotHeader />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <EmailField register={register} errors={errors} />

            <SubmitButton isLoading={isLoading} canSubmit={canSubmit} />

            <div className="mt-8">
              <BackLink />
            </div>
          </form>
        </div>

        {/* ================= SUCCESS CARD ================= */}
        {isSuccess && (
          <SuccessStateMobile
            canResend={canResend}
            formattedTime={formattedTime}
            handleResend={handleResend}
          />
        )}
      </div>
    </div>
  );
}
