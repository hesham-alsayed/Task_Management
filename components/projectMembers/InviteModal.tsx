"use client";

import React from "react";
import InviteIcon from "../icons/InviteIcon";
import CloseIcon from "../icons/CloseIcon";
import EmailIcon from "../icons/EmailIcon";
import { setOpenInviteModal } from "@/app/store/features/ui/uiSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { useMembersProject } from "@/hooks/useMembersProject";
import ExclamationIcon from "../icons/ExclamationIcon";
import Loader from "../shared/Loader";

export default function InviteModal() {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setOpenInviteModal(false));
  };

  const { form, onSubmit, loading } = useMembersProject();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;

  return (
    <div className="fixed inset-0 z-[5000] flex items-end  sm:items-center justify-center">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-[#041B3C33] cursor-pointer backdrop-blur-[2px]"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 w-full sm:w-auto">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white
        w-full
        sm:w-[470px]
        rounded-t-3xl
        sm:rounded-xl
        py-6
        px-6
        sm:px-8
        animate-invite-modal"
        >
          <div className="flex items-center justify-center">
            <div className="bg-[#C3C6D64D] w-16 h-1 flex items-senter justify-center rounded-lg items-center " />
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-[#F1F3FF] hidden py-4 px-3 rounded-lg sm:flex items-center justify-center">
              <InviteIcon />
            </div>

            <div onClick={handleClose} className="cursor-pointer  ml-auto">
              <CloseIcon />
            </div>
          </div>

          <h1 className="text-main font-bold text-[24px] mt-4">Invite Team Member</h1>

          <span className="text-sm text-[#4F5F7B] font-normal max-w-[384px]">
            Send an invitation to join the Architectural Studio workspace.
          </span>

          <div className="space-y-2 mt-4 max-sm:mt-6">
            <label htmlFor="email" className="label-form">
              email address
            </label>

            <div className="relative">
              <input
                {...register("email")}
                type="text"
                placeholder="Enter Email Address"
                className="input-form"
              />

              <span className="absolute top-6 right-3">
                <EmailIcon />
              </span>
            </div>
            {errors.email && isSubmitted && (
              <span className="text-[#BA1A1A] text-sm flex items-center gap-6">
                {errors.email.message} <ExclamationIcon />
              </span>
            )}
          </div>

          <div className="actions flex flex-col-reverse max-sm:gap-6  max-sm:mt-10 sm:flex-row   sm:items-center sm:justify-between mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm text-[#4F5F7B]cursor-pointer font-semibold px-12 py-3 text-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary-container max-sm:bg-primary max-sm:rounded-lg  max-sm:w-full  cursor-pointer w-[210px] text-white px-12 py-3 rounded-sm text-center capitalize"
            >
              {loading ? <Loader /> : "send invitation"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
