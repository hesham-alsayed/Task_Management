import Link from "next/link";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import Loader from "./Loader";

type AuthFooterProps = {
  isLoading: boolean;
  buttonText: string;
  infoText: string;
  linkText: string;
  linkUrl: string;
  mode: string;
};

export default function AuthFooter({
  isLoading,
  buttonText,
  infoText,
  linkText,
  linkUrl,
  mode,
}: AuthFooterProps) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary w-full flex items-center justify-center gap-2 max-md:h-14 max-md:text-[16px] ${
          isLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {isLoading ? (
          <Loader/>
        ) : (
          <>
            {mode === "login" ? (
              <span className="hidden sm:block">{buttonText}</span>
            ) : (
              <span>{buttonText}</span>
            )}
            {mode === "login" && <span className="sm:hidden flex items-center gap-4">Sign In <ArrowRightIcon/></span>}
          </>
        )}
      </button>

      <p className={` ${mode === 'login' ? "pt-40" : "py-10"} flex items-center justify-center gap-2 sm:py-10 text-[14px] text-slate-750`}>
        {infoText}

        <Link href={linkUrl} className="font-semibold text-primary-container">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
