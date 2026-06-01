/* eslint-disable @typescript-eslint/no-explicit-any */
import WatchIcon from "../icons/WatchIcon";

export default function ResendSection({
  handleResend,
  canResend,
  formattedTime,
}: any) {
  return (
    <div className="space-y-3 flex flex-col">

      <p
        style={{ letterSpacing: "0.5px", lineHeight: "16,5px" }}
        className="text-[11px] text-[#434654] text-center font-bold uppercase"
      >
        Didn’t receive email?
      </p>

      <button
        type="button"
        onClick={handleResend}
        aria-disabled={!canResend}
        className={`text-[16px] flex items-center justify-center gap-2 h-12 font-semibold transition
          ${
            !canResend
              ? "bg-[#F1F3FF] text-[#A1A4B3] cursor-not-allowed opacity-70"
              : "bg-[#F1F3FF] text-[#737685] hover:opacity-90"
          }`}
      >
        <WatchIcon />
        {canResend ? "Resend" : `Resend in ${formattedTime}`}
      </button>

    </div>
  );
}