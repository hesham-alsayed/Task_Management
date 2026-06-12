import React from "react";
import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";

export default function PaginationEpics() {
  const currentPage = 1;
  return (
    <div className="mt-20 flex items-center justify-between">
      <div className="text-[12px] font-medium text-[#434654]">
        Showing 4 of 6 active projects
      </div>

      <div className="flex items-center gap-2 font-bold text-[12px]">
        <button
          className={`w-8 h-8 border border-[#C3C6D64D] rounded flex items-center justify-center `}
        >
          <PrevArrow />
        </button>

        {Array.from({ length: 2 }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
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
          className={`w-8 h-8 border border-[#C3C6D64D] rounded flex items-center justify-center `}
        >
          <NextArrow />
        </button>
      </div>
    </div>
  );
}
