"use client";

import FormField from "../shared/FormField";
import PasswordRequirements from "./PasswordRequirements";
import { useSignupForm } from "@/hooks/useSignupFrom";
import AuthFooter from "../shared/AuthFooter";
import AuthHeader from "../shared/AuthHeader";

export default function SignupForm() {
  const { form, onSubmit, requirements, isLoading } = useSignupForm();

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitted },
  } = form;

  return (
    <main className="w-[390px] sm:w-xl sm:mx-w-xl  sm:h-209.5  rounded-lg p-6 sm:p-12 sm:shadow-[0px_24px_48px_0px_#041B3C0F]">
      <AuthHeader
        title="Create your workspace"
        description="Join the editorial approach to task management."
        mode="signup"
      />

      <form className="sm:mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="name"
          label="Name"
          placeholder="Enter your full name"
          helperText="3-50 characters, letters only."
          register={register("name")}
          error={errors.name?.message}
          isSubmitted={isSubmitted}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="yourname@company.com"
          register={register("email")}
          error={errors.email?.message}
          isSubmitted={isSubmitted}
        />

        <FormField
          id="jobTitle"
          label="Job Title (Optional)"
          placeholder="e.g. Project Manager"
          register={register("jobTitle")}
          error={errors.jobTitle?.message}
          isSubmitted={isSubmitted}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register("password")}
            error={errors.password?.message}
            isSubmitted={isSubmitted}
          />

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            isSubmitted={isSubmitted}
          />
        </div>

        <div className="hidden sm:block">
          <PasswordRequirements requirements={requirements} />
        </div>

        <AuthFooter
          isLoading={isLoading}
          buttonText="Create Account"
          infoText="Already have an account?"
          linkText="Sign In"
          linkUrl="/login"
          mode="signup"
        />
      </form>
    </main>
  );
}
