import React from "react";
import WatchIcon from "../icons/WatchIcon";

type ResendButtonProps = {
  canResend: boolean;
  handleResend: () => void;
  formattedTime: string;
  isLoading: boolean;
};

export default function ResendButton({
  canResend,
  handleResend,
  formattedTime,
  isLoading,
}: ResendButtonProps) {
  return (
    <button
      type="button"
      disabled={!canResend || isLoading}
      onClick={handleResend}
      className="rounded-sm flex items-center w-full h-12 text-[#737685] bg-surface-low text-[16px] font-semibold justify-center gap-2 disabled:opacity-50"
    >
      <WatchIcon />

      {canResend ? "Resend" : `Resend in ${formattedTime}`}
    </button>
  );
}
