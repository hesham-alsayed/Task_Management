import React from "react";
import EpicIcon from "../icons/EpicIcon";
import { EpicDetails } from "./EpicModalDetails";
import CloseIcon from "../icons/CloseIcon";
import { useAppDispatch } from "@/app/store/hooks";
import {
  setOpenEpicModal,
  setSelectedEpicId,
} from "@/app/store/features/ui/uiSlice";

type Props = {
  epic: EpicDetails;
};

export default function HeaderEpicDetails({ epic }: Props) {
  const { epic_id, title } = epic;
  const dispatch = useAppDispatch();
  return (
    <div className="space-y-3 md:border-b p-6 rounded-t-xl   max-md:bg-[#F1F3FF] md:border-b-[#7a7a7a26]  md:pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden md:block">
            <EpicIcon />
          </span>

          <span className="text-[12px] font-bold max-md:text-[#003D9B] text-[#041B3C99]">
            {epic_id}
          </span>
        </div>

        <button
          onClick={() => {
            dispatch(setSelectedEpicId(null));
            dispatch(setOpenEpicModal(false));
          }}
          className="cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>

      <h1 className="text-[24px] font-bold text-main">{title}</h1>
    </div>
  );
}
