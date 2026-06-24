"use client";

type Props = {
  message?: string;
};

export default function TaskErrorState({ message = "Failed to load task details" }: Props) {
  return (
    <div className="flex items-center justify-center mt-40 px-6">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 8V13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="#DC2626" />
            <path
              d="M10.29 3.86L1.82 18C1.64 18.31 1.55 18.67 1.56 19.03C1.57 19.39 1.68 19.74 1.88 20.04C2.08 20.34 2.37 20.58 2.71 20.74C3.04 20.9 3.42 20.98 3.79 20.98H20.21C20.58 20.98 20.96 20.9 21.29 20.74C21.63 20.58 21.92 20.34 22.12 20.04C22.32 19.74 22.43 19.39 22.44 19.03C22.45 18.67 22.36 18.31 22.18 18L13.71 3.86C13.52 3.57 13.27 3.34 12.98 3.18C12.68 3.02 12.34 2.94 12 2.94C11.66 2.94 11.32 3.02 11.02 3.18C10.73 3.34 10.48 3.57 10.29 3.86Z"
              stroke="#DC2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-main">Something went wrong</h2>

        <p className="mt-2 text-sm text-[#6B7280] max-w-sm">{message}</p>
      </div>
    </div>
  );
}
