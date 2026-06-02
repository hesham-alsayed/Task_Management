import Link from "next/link";
import React from "react";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import Loader from "../shared/Loader";

export default function ForgotActions({ isLoading }: { isLoading: boolean }) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className={` hover:opacity-90 btn-primary w-full flex items-center justify-center gap-2 h-12 text-[16px]   ${
          isLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isLoading ? <Loader /> : "Send Reset Link"}
      </button>

      <Link
        className="max-sm:pt-6 flex items-center gap-2 mt-6 text-primary text-[14px] font-medium justify-center"
        href={"/login"}
      >
        <LeftArrowIcon /> Back to log in
      </Link>
    </div>
  );
}
