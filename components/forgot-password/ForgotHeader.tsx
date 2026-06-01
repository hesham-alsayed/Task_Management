import React from "react";
import ForgotIcon from "../icons/ForgotIcon";

export default function ForgotHeader() {
  return (
    <div className="max-sm:text-center flex flex-col items-center  ">
      <div className="sm:hidden bg-[#D7E2FF] mb-6 w-[48px] h-[48px] rounded-lg flex items-center justify-center ">
        <ForgotIcon />
      </div>
      <h1 className="max-sm:text-[28px] text-[32px] text-[#041B3C] max-sm:pb-2 font-semibold">
        Forgot password?
      </h1>
      <p className="text-[14px] max-sm:px-4 text-[#434654]">
        No worries, we&apos;ll send you reset instructions.
      </p>
    </div>
  );
}
