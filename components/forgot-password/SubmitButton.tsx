/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SubmitButton({ isLoading, canSubmit }: any) {
  return (
    <button
      type="submit"
      aria-disabled={!canSubmit}
      className={`btn-primary w-full h-12 ${
        !canSubmit ? "cursor-not-allowed opacity-70" : "hover:opacity-90"
      }`}
    >
      {isLoading ? "Sending..." : "Send Reset Link"}
    </button>
  );
}