"use client";
import HighGoalIcon from "../icons/HighGoalIcon";
import HireArchyIcon from "../icons/HireArchyIcon";
import VelocityIcon from "../icons/VelocityIcon";
import RocketIcon from "../icons/RocketIcon";
import GridIcon from "../icons/GridIcon";
import NetworkIcon from "../icons/NetworkIcon";
import BatteryIcon from "../icons/BatteryIcon";
import { useParams, useRouter } from "next/navigation";

const PlusIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z"
        fill="#003D9B"
        fillOpacity="0.3"
      />
    </svg>
  );
};
export default function EpicEmptyState() {
  const params = useParams();
  const projectId = params.projectId as string;
  const router = useRouter();
  const features = [
    {
      icon: <HighGoalIcon />,
      title: "High-Level Goals",
      text: "Define the broad objectives that span across multiple cycles.",
    },
    {
      icon: <HireArchyIcon />,
      title: "Hierarchy Design",
      text: "Link individual tasks to parent epics for a consolidated view.",
    },
    {
      icon: <VelocityIcon />,
      title: "Track Velocity",
      text: "Visualize percentage completion at a macro project level.",
    },
  ];

  return (
    <div className="min-h-[650px] flex flex-col items-center justify-center bg-[#F8F9FF] px-5">
      <div className="w-[196px] h-[196px] bg-white rounded-[30px] shadow-[0_15px_40px_rgba(40,80,180,0.12)] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3">
          <div className="w-14 h-14 rounded-lg bg-[#DCE6FF] flex items-center justify-center ">
            <RocketIcon />
          </div>

          <div className="w-14 h-14 rounded-lg bg-[#E7EDFF] flex items-center justify-center ">
            <NetworkIcon />
          </div>

          <div className="w-14 h-14 rounded-lg bg-[#DCE6FF] flex items-center justify-center ">
            <GridIcon />
          </div>

          <div className="w-14 h-14 rounded-lg border-2 border-dashed border-[#C9D5F5] flex items-center justify-center ">
            <PlusIcon />
          </div>
        </div>
      </div>

      <div className="text-center flex flex-col items-center mt-10 max-w-[520px]">
        <h1 className="text-[28px] font-semibold text-main">
          No epics in this project yet.
        </h1>

        <p className="mt-4 text-[16px] leading-6 text-[#4B5568]">
          Break down your large project into manageable
          <br />
          epics to track progress better and maintain
          <br />
          architectural clarity.
        </p>

        <button
          onClick={() => router.push(`/project/${projectId}/epics/new`)}
          className="btn-primary flex items-center gap-2 px-8 py-6 mt-6"
        >
          <BatteryIcon />
          Create First Epic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 max-w-[760px] w-full">
        {features.map((item) => (
          <div
            key={item.title}
            className="
            bg-[#F1F3FF]
            rounded-xl
            p-5
            min-h-[155px]"
          >
            <div
              className="
              w-9 h-9 
              bg-white 
              rounded-md
              flex
              items-center
              justify-center
              text-primary
            "
            >
              {item.icon}
            </div>

            <h3 className="mt-4 font-semibold text-main text-[16px]">
              {item.title}
            </h3>

            <p className="mt-2 text-[12px]  text-[#434654] font-normal">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
