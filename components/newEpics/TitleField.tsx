import { EpicForm } from "@/hooks/useEpicForm";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<EpicForm>;
};

export default function TitleField({ register }: Props) {
  return (
    <div className="title flex flex-col sm:grid grid-cols-4 gap-3">
      <label className="label-form mt-3" htmlFor="title">
        TITLE <span className="text-[#BA1A1A] text-sm">*</span>
      </label>

      <input
        {...register("title")}
        type="text"
        id="title"
        className="input-form w-full col-span-3"
        placeholder="Enter Title Epic"
      />
    </div>
  );
}
