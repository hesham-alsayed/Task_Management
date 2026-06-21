import { EpicForm } from "@/hooks/useEpicForm";
import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<EpicForm>;
};

export default function DeadlineField({ register }: Props) {
  return (
    <div className="space-y-4 w-full">
      <label htmlFor="deadline" className="label-form">
        Deadline
      </label>

      <input {...register("deadline")} type="date" id="deadline" className="input-form w-full" />
    </div>
  );
}
