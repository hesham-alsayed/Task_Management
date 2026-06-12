import MobileMemberCardsSkeleton from "./MobileMemberCardsSkeleton";

export default function MobileMembersSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <MobileMemberCardsSkeleton key={index} />
      ))}
    </div>
  );
}
