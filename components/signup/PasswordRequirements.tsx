import CheckCircleIcon from "../icons/CheckCircleIcon";
import CircleIcon from "../icons/CircleIcon";

type Requirement = {
  text: string;
  valid: boolean;
};

export default function PasswordRequirements({requirements}: {requirements: Requirement[]}) {
  return (
    <div className="bg-card rounded-lg p-4 space-y-2 text-[11px]">
      {requirements.map((item) => (
        <div key={item.text} className="flex items-center gap-2">
          {item.valid ? <CheckCircleIcon /> : <CircleIcon />}
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
