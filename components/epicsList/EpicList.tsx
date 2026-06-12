import { Epic } from "@/hooks/useGetAllEpics";
import React from "react";
import EpicCard from "./EpicCard";
import MobileEpicCard from "./MobileEpicCard";

type Props = {
  data: Epic[];
};
export default function EpicList({ data }: Props) {
  return (
    <>
      <div className="hidden sm:grid grid-cols-2 gap-6">
        {data.map((epic) => (
          <EpicCard epic={epic} key={epic.epic_id} />
        ))}
      </div>

      <div className=" sm:hidden flex flex-col gap-4 ">
        {data.map((epic) => (
          <MobileEpicCard epic={epic} key={epic.epic_id} />
        ))}
      </div>
    </>
  );
}
