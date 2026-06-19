export default function TasksBoardViewSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between">
        <div>
          <div className="h-4 w-52 bg-skeleton rounded" />
          <div className="h-8 w-72 bg-skeleton rounded mt-6" />
          <div className="h-4 w-96 bg-skeleton rounded mt-3" />
        </div>

        <div className="flex items-end gap-4">
          <div className="w-[256px] h-10 bg-skeleton rounded-md" />
          <div className="w-32 h-10 bg-skeleton rounded-md" />
          <div className="w-10 h-10 bg-skeleton rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[52px] bg-skeleton rounded-lg" />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-6 mt-2">
        {Array.from({ length: 4 }).map((_, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-3">
            <div className="h-[58px] bg-skeleton rounded-lg" />

            {Array.from({ length: 4 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="h-[114px] bg-skeleton rounded-lg"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
