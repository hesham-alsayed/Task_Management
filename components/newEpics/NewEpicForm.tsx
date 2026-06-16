import { UseFormReturn } from "react-hook-form";
import { NewEpicFormData } from "@/hooks/useNewEpicForm";

import TitleField from "./TitleField";
import FormFieldError from "./FormFieldError";
import DescriptionField from "./DescriptionField";
import AssigneeField from "./AssigneeField";
import DeadlineField from "./DeadlineField";
import FormActions from "./FormAction";
import { ProjectMember } from "../projectMembers/MembersTable";

type Props = {
  form: UseFormReturn<NewEpicFormData>;
  onSubmit: (data: NewEpicFormData) => Promise<void>;
  handleResetForm: () => void;
  loading: boolean;
  members: ProjectMember[];
};
export default function NewEpicForm({
  form,
  loading,
  onSubmit,
  handleResetForm,
  members,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
  return (
    <div className=" sm:mt-10 md:shadow-[0px_24px_48px_-12px_#041B3C0F]  border-[#C3C6D61A] sm:bg-[#ffffff] py-4  sm:p-4 md:p-6 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <TitleField register={register} />

        <FormFieldError
          isSubmitted={isSubmitted}
          message={errors.title?.message}
        />

        <FormFieldError
          isSubmitted={isSubmitted}
          mobile
          message={errors.title?.message}
        />

        <DescriptionField register={register} />

        <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-6">
          <AssigneeField register={register} members={members} />

          <DeadlineField register={register} />
        </div>
        <FormActions loading={loading} onCancel={handleResetForm} />
      </form>
    </div>
  );
}
