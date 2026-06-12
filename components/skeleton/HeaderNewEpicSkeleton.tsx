export default function HeaderNewEpicSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="hidden sm:flex items-center gap-2">
        <div className="h-3 w-14 rounded bg-skeleton" />
        <div className="h-3 w-3 rounded bg-skeleton" />
        <div className="h-3 w-24 rounded bg-skeleton" />
        <div className="h-3 w-3 rounded bg-skeleton" />
        <div className="h-3 w-16 rounded bg-skeleton" />
        <div className="h-3 w-3 rounded bg-skeleton" />
        <div className="h-3 w-20 rounded bg-skeleton" />
      </div>

      <div className="mt-5">
        <div className="h-11 w-80 rounded bg-skeleton" />

        <div className="mt-4 max-w-[512px] space-y-2">
          <div className="h-4 w-full rounded bg-skeleton" />
          <div className="h-4 w-[90%] rounded bg-skeleton" />
          <div className="h-4 w-[70%] rounded bg-skeleton" />
        </div>
      </div>
    </div>
  );
}
