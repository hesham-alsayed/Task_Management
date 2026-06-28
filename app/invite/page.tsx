"use client";

import AcceptInviteIcon from "@/components/icons/AcceptInviteIcon";
import Header from "@/components/shared/Header";
import Loader from "@/components/shared/Loader";
import { useMembersProject } from "@/hooks/useMembersProject";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { handleAcceptInvitation, loading } = useMembersProject();
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-main">Not Found Invitation</h1>

          <p className="mt-2 text-[#4F5F7B]">
            This invitation link is invalid or missing the invitation token.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[576px]">
        <div className="flex items-center justify-center">
          <Header />
        </div>
        <div className="mt-8">
          <div className="relative w-full h-[285px] rounded-xl shadow-lg overflow-hidden">
            <div className="h-1 bg-primary" />

            <div className="px-10 py-6 flex flex-col items-center">
              <div className="flex items-center gap-2 rounded-3xl bg-[#E0E8FF] px-6 py-2">
                <AcceptInviteIcon />
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#434654]">
                  New Project Invitation
                </span>
              </div>

              <h1 className="mt-6 text-center text-[30px] font-semibold leading-[1.05] text-main">
                You've been invited to join
                <br />
                new project
              </h1>

              <button
                disabled={loading}
                onClick={() => handleAcceptInvitation(token as string)}
                style={{
                  lineHeight: "30px",
                  letterSpacing: "0.5px",
                }}
                className="mt-9 w-full h-[56px] flex items-center justify-center rounded-sm hover:cursor-pointer bg-primary-container text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,77,184,0.25)]"
              >
                {loading ? <Loader /> : " Accept Invitation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
