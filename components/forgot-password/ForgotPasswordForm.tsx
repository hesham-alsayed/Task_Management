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
    <div className=" w-full flex justify-center max-w-md  mt-10 max-sm:mb-40  ">
      <div className="w-full h-full  max-h-[579px] sm:max-h-[651px] max-w-[342px] sm:max-w-[448px]  flex flex-col gap-6">
        <div className="h-full bg-background rounded-lg p-6 sm:p-10  space-y-6 shadow-[0px_24px_48px_0px_#041B3C0F]">
          <ForgotHeader />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <EmailField register={register} errors={errors} />

            <SubmitButton isLoading={isLoading} canSubmit={canSubmit} />

            <div className="mt-8">
              <BackLink />
            </div>

            <div className="hidden sm:block">
              {isSuccess && (
                <SuccessMessage
                  canResend={canResend}
                  isSuccess={isSuccess}
                  handleResend={handleResend}
                  formattedTime={formattedTime}
                />
              )}
            </div>
          </form>
        </div>

        {/* ================= SUCCESS CARD ================= */}
        <div className="block sm:hidden">
          {isSuccess && (
            <SuccessStateMobile
              canResend={canResend}
              formattedTime={formattedTime}
              handleResend={handleResend}
            />
          )}
        </div>
      </div>
    </div>
  );
}
