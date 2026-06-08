import BulmIcon from "../icons/BulmIcon";

export default function FooterAddProject() {
  return (
    <div className=" max-sm:mx-4 max-sm:flex-col max-sm:text-start bg-[#F1F3FF] text-[#4F5F7B] p-8 flex sm:items-center gap-2 text-[12px] font-normal ">
      <span className="hidden sm:block">
        <BulmIcon />
      </span>
      <strong className="font-bold capitalize whitespace-nowrap">
        Pro Tip:
      </strong>
      You can invite project members and assign epics immediately after the
      initial creation process.
    </div>
  );
}
