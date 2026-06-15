"use client";
import { Epic } from "@/hooks/useGetAllEpics";
import React from "react";
import EpicCard from "./EpicCard";
import MobileEpicCard from "./MobileEpicCard";
import { useAppDispatch } from "@/app/store/hooks";
import {
  setOpenEpicModal,
  setSelectedEpicId,
} from "@/app/store/features/ui/uiSlice";

type Props = {
  data: Epic[];
};
export default function EpicList({ data }: Props) {
  const dispatch = useAppDispatch();
  console.log(data);
  return (
    <>
      <div className="hidden sm:grid grid-cols-2 gap-6">
        {data.map((epic) => (
          <div
            key={epic.id}
            onClick={() => {
              dispatch(setSelectedEpicId(epic.id));
              dispatch(setOpenEpicModal(true));
            }}
          >
            <EpicCard epic={epic} />
          </div>
        ))}
      </div>

      <div className=" sm:hidden flex flex-col gap-4 ">
        {data.map((epic) => (
          <div
            key={epic.id}
            onClick={() => {
              dispatch(setSelectedEpicId(epic.id));
              dispatch(setOpenEpicModal(true));
            }}
          >
            <MobileEpicCard epic={epic} />
          </div>
        ))}
      </div>
    </>
  );
}
