/* eslint-disable @typescript-eslint/no-explicit-any */
export default function EmailField({ register, errors }: any) {
  return (
    <div className="space-y-2">
      <label className="label-form">Email Address</label>

      <input
        type="email"
        placeholder="Enter your email"
        className={`input-form ${errors.email ? "border-red-500" : ""}`}
        {...register("email")}
      />

      {errors.email && (
        <p className="text-xs text-red-500">{errors.email.message}</p>
      )}
    </div>
  );
}