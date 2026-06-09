"use client";
import ExclamationIcon from "../icons/ExclamationIcon";
import HeaderFormProject from "./HeaderFormProject";
import Loader from "../shared/Loader";
import { useAddNewProjectForm } from "@/hooks/useAddNewProjectForm";
import { useRouter } from "next/navigation";

export default function FormAddProject() {
  const { form, isLoading, onSubmit } = useAddNewProjectForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:bg-[#ffff] py-4 px-4 sm:px-8 w-full"
    >
      <HeaderFormProject />

      <div className="form mt-4 space-y-4">
        <div className="title">
          <label className="label-form" htmlFor="title">
            Project TITLE <span className="text-[#BA1A1A]">*</span>
          </label>

          <input
            {...register("name")}
            type="text"
            id="title"
            className="input-form w-full"
          />

          {errors.name && isSubmitted && (
            <span className="flex mt-2 items-center gap-2 text-[#BA1A1A] font-medium text-[12px]">
              <ExclamationIcon />
              {errors.name?.message}
            </span>
          )}
        </div>

        <div className="title">
          <div className="flex items-center justify-between">
            <label className="label-form" htmlFor="description">
              Description
            </label>

            <span className="text-[11px] font-medium text-[#4F5F7B99]">
              Optional
            </span>
          </div>

          <textarea
            id="description"
            className="input-form h-37! px-4! py-2! w-full"
            {...register("description")}
          />

          <div className="flex items-center justify-between">
            <div>
              {errors.description && (
                <span className="flex mt-2 items-center gap-2 text-[#BA1A1A] font-medium text-[12px]">
                  {errors.description?.message}
                </span>
              )}
            </div>
            <div>
              <span className="flex mt-2 text-[#4F5F7B] justify-end font-medium text-[11px]">
                {form.watch("description")?.length || 0} / 500{" "}
                <span className="ml-2 hidden sm:inline">characters</span>
              </span>
            </div>
          </div>
        </div>

        <div className="actions flex flex-col-reverse sm:flex-row items-center sm:justify-between py-6 gap-4">
          <button
            type="button"
            onClick={() => router.push("/project")}
            className="text-sm font-bold max-sm:text-primary  text-[#4F5F7B] sm:mx-10 hover:cursor-pointer"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full min-w-45 w sm:w-auto capitalize py-3 px-8 h-11"
          >
            {isLoading ? <Loader /> : "create project"}
          </button>
        </div>
      </div>
    </form>
  );
}
