export default function MobileMemberCardsSkeleton() {
  return (
    <div className="animate-pulse flex items-center justify-between rounded-xl bg-white p-4 shadow-sm w-full">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-skeleton" />

        <div className="space-y-2 min-w-0">
          <div className="h-4 w-28 rounded bg-skeleton" />
          <div className="h-3 w-44 max-w-[60vw] rounded bg-skeleton" />
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="h-6 w-16 rounded-lg bg-skeleton" />
        <div className="h-5 w-5 rounded bg-skeleton" />
      </div>
    </div>
  );
}