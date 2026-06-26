import CheckCircleIcon from "../icons/CheckCircleIcon";
import CircleIcon from "../icons/CircleIcon";
import CheckMobileIcon from "./CheckMobileIcon";

type Requirement = {
  text: string;
  valid: boolean;
};

type Props = {
  requirements: {
    desktop: Requirement[];
    mobile: Requirement[];
  };
};

export default function PasswordRequirements({ requirements }: Props) {
  return (
    <div className="bg-[#F1F3FF] p-5 sm:border  sm:border-[#C3C6D61A] rounded-sm space-y-4">
      <div className="sm:border-b sm:border-b-[#C3C6D64D]">
        <h1 className="text-[11px] font-bold uppercase pb-2 text-[#041B3C]">
          Security Requirements
        </h1>
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:grid grid-cols-2 grid-rows-3 gap-3">
        {requirements.desktop.map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            {item.valid ? <CheckCircleIcon /> : <CircleIcon />}

            <span
              className={`text-[13px] font-normal ${item.valid ? "text-[#041B3C]" : "text-gray-500"}`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* MOBILE */}
      <div className="sm:hidden flex flex-col gap-3">
        {requirements.mobile.map((item) => (
          <div key={item.text} className="flex items-center gap-2">
            {item.valid ? <CheckMobileIcon /> : <CircleIcon />}

            <span
              className={`text-[13px] font-normal ${item.valid ? "text-[#041B3C]" : "text-gray-500"}`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
