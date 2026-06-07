import Header from "@/components/shared/Header";
import SignupForm from "@/components/signup/SignupForm";
import React from "react";

export default function SignupPage() {
  return (
    <div className="flex items-center  justify-center md:mb-20 ">
      <SignupForm />
    </div>
  );
}
