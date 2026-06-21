import { UseFormRegister } from "react-hook-form";
import { NewEpicFormData } from "@/hooks/useEpicForm";

type Props = {
  register: UseFormRegister<NewEpicFormData>;
};

export default function DescriptionField({ register }: Props) {
  return (
    <div className="description flex flex-col sm:grid gap-4 grid-cols-4">
      <div className="flex flex-col gap-1">
        <label className="label-form mt-3" htmlFor="description">
          Description
        </label>

        <span className="text-[11px] font-medium text-[#4F5F7B99]">Optional</span>
      </div>

      <textarea
        id="description"
        className="input-form h-37! px-4! py-2! w-full col-span-3"
        {...register("description")}
        placeholder="Enter Description of epic Here"
      />
    </div>
  );
}
