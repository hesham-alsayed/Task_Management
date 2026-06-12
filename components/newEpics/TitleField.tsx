import { UseFormRegister } from "react-hook-form";
import { NewEpicFormData } from "@/hooks/useNewEpicForm";

type Props = {
  register: UseFormRegister<NewEpicFormData>;
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