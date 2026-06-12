import { ReactNode } from "react";
import CurrentLocation, { Crumb } from "./CurrentLocation";

type HeaderPageProps = {
  title: string;
  items: Crumb[];
  buttonText?: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
};

export default function HeaderPage({
  title,
  items,
  buttonText,
  buttonIcon,
  onButtonClick,
}: HeaderPageProps) {
  return (
    <div className="sm:flex gap-2 justify-between hidden">
      <div className="space-y-4">
        <CurrentLocation items={items} />

        <h1
          style={{ letterSpacing: "-0.9px" }}
          className="text-[36px] text-[#041B3C] font-semibold"
        >
          {title}
        </h1>
      </div>

      {buttonText && (
        <div className="flex items-end mb-2">
          <button 
          style={{
            letterSpacing:"1px"
          }}
            onClick={onButtonClick}
            className="btn-primary capitalize  h-10 rounded-sm text-sm font-bold flex items-center justify-center gap-2 py-2 px-4 w-45"
          >
            {buttonIcon}
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}
