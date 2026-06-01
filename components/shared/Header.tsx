import LogoIcon from "../icons/LogoIcon";

export default function Header() {
  return (
    <header className="h-20 p-6 md:p-10">
      <div className="flex items-center gap-3">
        <LogoIcon />
        <span className="text-foreground font-bold text-[20px] leading-5 tracking-[-0.5px]">
          TASKLY
        </span>
      </div>
    </header>
  );
}
