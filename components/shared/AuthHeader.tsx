type AuthHeaderProps = {
  title: string;
  description: string;
  mode: string
};

export default function AuthHeader({
  title,
  description,
  mode
}: AuthHeaderProps) {
  return (
    <div className={` ${mode === "login" ? "text-center max-sm:max-w-58 max-sm:mx-auto" : "text-start"}  md:text-center`}>
      <h1 className={` ${mode === 'login' ? "text-[24px]" : "text-[28px]"} font-semibold md:text-[30px]`}>
        {title}
      </h1>

      <p className="text-[14px] text-slate-750">
        {description}
      </p>
    </div>
  );
}