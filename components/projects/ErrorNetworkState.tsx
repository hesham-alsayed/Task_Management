"use client";

import React from "react";
import ErrorNetworkIcon from "../icons/ErrorNetworkIcon";
import Loader from "../shared/Loader";

type Props = {
  retryFunction: () => void;
  isLoading: boolean;
  error?: string;
};

export default function ErrorNetworkState({
  retryFunction,
  isLoading,
  error,
}: Props) {
  const finalError =
    error ||
    "We're having trouble retrieving your projects right now. Please try again.";
  return (
    <div className="flex flex-col items-center my-20 justify-center gap-3">
      <div className="w-14 h-14 rounded-sm flex items-center justify-center bg-[#FFDAD6]">
        <ErrorNetworkIcon />
      </div>

      <h1 className="font-semibold text-main text-[20px]">
        Something went wrong
      </h1>

      <p className="max-w-[320px] text-center text-[#434654] text-[16px] font-normal">
        {finalError}
      </p>

      <button
        onClick={retryFunction}
        disabled={isLoading}
        className="btn-primary px-6 py-2 disabled:opacity-60 w-55"
      >
        {isLoading ? <Loader /> : "Retry Connection"}
      </button>
    </div>
  );
}
