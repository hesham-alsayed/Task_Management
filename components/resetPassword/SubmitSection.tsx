import Link from "next/link";
import Loader from "../shared/Loader";

export default function SubmitSection({isLoading}: {isLoading: boolean}) {
  return (
    <div className="action space-y-4">

      <button
        type="submit" 
        className="w-full mb-8 h-[55px] hover:cursor-pointer rounded-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
      >
        {isLoading ? <Loader /> : "Send Reset Link"}
      </button>

      {/* Desktop */}
      <Link
        href="/login"
        className="hidden sm:flex text-primary text-[13px] font-medium hover:underline justify-center"
      >
        Back to sign in
      </Link>

      {/* Mobile */}
      <Link
        href="/login"
        className="flex sm:hidden text-primary text-[13px] font-medium hover:underline justify-center"
      >
        Back to Log In
      </Link>

    </div>
  );
}