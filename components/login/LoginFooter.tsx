import Link from "next/link";
import Loader from "../shared/Loader";

export default function LoginFooter({ isLoading }: { isLoading: boolean }) {
  return (
    <div>
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary max-md:h-14 max-md:text-[16px] w-full flex items-center justify-center gap-2 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          "Create Account"
        )}
      </button>

      <p className="flex items-center justify-center gap-2 py-10 text-[14px] text-slate-750">
        Don&apos;t have an account?
        <Link href="/login" className="font-semibold text-primary-container">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
