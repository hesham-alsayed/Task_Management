"use client";
import React from "react";
import FormField from "../shared/FormField";
import Link from "next/link";
import AuthFooter from "../shared/AuthFooter";
import AuthHeader from "../shared/AuthHeader";
import { useLoginForm } from "@/hooks/useLoginForm";

export default function LoginForm() {
  const { form, isLoading, onSubmit } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitted },
  } = form;
  return (
    <main className=" w-[390px] sm:w-120  h-[757px]  sm:h-146.5  rounded-lg px-6  pt-16 sm:p-12 sm:shadow-[0px_24px_48px_0px_#041B3C0F]">
      <AuthHeader
        title="welcome back"
        description="Please enter your details to access your workspace" 
        mode="login" 
      />
      <form className="mt-10 sm:mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="yourname@company.com"
          register={register("email")}
          error={errors.email?.message}
          mode={'login'} 
          isSubmitted={isSubmitted}
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          error={errors.password?.message} 
          mode={'login'}
          isSubmitted={isSubmitted}
        />
        <div className="flex items-center justify-between mb-14">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded "
              {...register("rememberMe")}
            />
            <span className="text-sm ">Remember me</span>
          </label>

          <Link
            href={"/forgot-password"}
            className=" hidden sm:block text-sm font-medium hover:underline text-primary"
          >
            Forgot Password?
          </Link>
        </div>
        <div>
          <AuthFooter
            isLoading={isLoading}
            buttonText="Login"
            infoText="Don't have an account?"
            linkText="Sign Up"
            linkUrl="/signup"
            mode="login"
          />
        </div>
      </form>
    </main>
  );
}
