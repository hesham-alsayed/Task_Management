import StartProjectIcon from "../icons/StartProjectIcon";

export default function HeaderFormProject() {
  return (
    <div className="-mx-8 sm:border-b border-b-[#e6e7eb] px-8 py-4  sm:pb-10">
      <div className="flex items-center gap-4">
        <div className="w-[46px] h-[44px] hidden sm:block rounded-sm p-3 bg-[#0052CC1A]">
          <StartProjectIcon />
        </div>

        <div>
          <h1 className="text-[24px] font-semibold">
            Initialize New Project
          </h1>

          <span className="text-sm font-medium text-[#4F5F7B]">
            Define the scope and foundational details of your project.
          </span>
        </div>
      </div>
    </div>
  );
}