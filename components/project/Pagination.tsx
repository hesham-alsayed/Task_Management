import NextArrow from "../icons/NextArrow";
import PrevArrow from "../icons/PrevArrow";

export default function Pagination() {
  return (
    <div className="mt-20 flex items-center justify-between ">
      <div className="text-[12px] font-medium text-[#434654]">
        Showing 6 of 24 active projects
      </div>

      <div className="flex items-center gap-2 font-bold text-[12px]">
        <button className="w-8 h-8 border border-[#C3C6D64D] flex items-center justify-center rounded bg-gray-100 cursor-not-allowed">
          <PrevArrow />
        </button>

        <button className="w-8 h-8 border border-[#C3C6D64D] rounded flex items-center justify-center bg-primary text-white">
          1
        </button>

        <button className="w-8 h-8 border border-[#C3C6D64D] rounded flex items-center justify-center bg-white text-[#434654]">
          2
        </button>

        <button className="w-8 h-8 border border-[#C3C6D64D] flex items-center justify-center rounded bg-white">
          <NextArrow />
        </button>
      </div>
    </div>
  );
}
