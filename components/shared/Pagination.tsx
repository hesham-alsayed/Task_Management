"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";
import { getPagination } from "@/lib/helper/getPaginationPages";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  actualLength: number;
  limit: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  type: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  actualLength,
  limit,
  hasNextPage,
  hasPrevPage,
  type,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pages = getPagination(currentPage, totalPages);

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
        <div className="text-[12px] font-medium text-[#434654]">
          Showing {actualLength} of {totalCount} active {type}
        </div>{" "}
      </div>

      <div className="flex items-center gap-2 text-[12px] font-bold">
        <button
          onClick={handlePrev}
          disabled={!hasPrevPage}
          className={`w-8 h-8 border  rounded   flex items-center justify-center ${
            !hasPrevPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <PrevArrow />
        </button>

        {pages.map((page: any, i: number) => {
          if (page === "...") {
            return (
              <span
                key={i}
                className="w-8 h-8 flex items-center justify-center"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={i}
              onClick={() => changePage(page)}
              className={`w-8 h-8 border rounded flex items-center justify-center ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-white text-[#434654]"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`w-8 h-8 border  rounded flex items-center justify-center ${
            !hasNextPage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <NextArrow />
        </button>
      </div>
    </div>
  );
}
