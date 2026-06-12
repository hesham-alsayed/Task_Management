import { UseFormRegister } from "react-hook-form";
import { NewEpicFormData } from "@/hooks/useNewEpicForm";

type Props = {
  register: UseFormRegister<NewEpicFormData>;
};

export default function DeadlineField({ register }: Props) {
  return (
    <div className="space-y-4 w-full">
      <label htmlFor="deadline" className="label-form">
        Deadline
      </label>

      <input
        {...register("deadline")}
        type="date"
        id="deadline"
        className="input-form w-full"
      />
    </div>
  );
}