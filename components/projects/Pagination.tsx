"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  actualLength: number;
};

export default function Pagination({
  currentPage,
  totalCount,
  totalPages,
  hasNextPage,
  hasPrevPage,
  actualLength,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") || "5";

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    params.set("limit", limit);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    if (!hasNextPage) return;

    changePage(currentPage + 1);
  };

  const handlePrev = () => {
    if (!hasPrevPage) return;

    changePage(currentPage - 1);
  };

  return (
    <div className="mt-20 flex items-center justify-between">
      <div className="text-[12px] font-medium text-[#434654]">
        Showing {actualLength} of {totalCount} active projects
      </div>

      <div className="flex items-center gap-2 font-bold text-[12px]">
        <button
          onClick={handlePrev}
          disabled={!hasPrevPage}
          className={`w-8 h-8 border border-[#C3C6D64D] rounded   flex items-center justify-center ${
            !hasPrevPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <PrevArrow />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={`w-8 h-8 border rounded flex items-center justify-center ${
                currentPage === pageNumber
                  ? "bg-primary text-white"
                  : "bg-white text-[#434654]"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`w-8 h-8 border border-[#C3C6D64D] rounded flex items-center justify-center ${
            !hasNextPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <NextArrow />
        </button>
      </div>
    </div>
  );
}
