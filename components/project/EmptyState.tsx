import React from "react";
import ButtonCreateProject from "./ButtonCreateProject";

export default function EmptyState() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="relative bg-[#F1F3FF] w-72 h-72  rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-[#D7E2FF] rounded-2xl flex items-center justify-center shadow-md">
            <svg
              width="25"
              height="43"
              viewBox="0 0 25 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.33654 42.3077L0 39.6923L6.45193 21.8942C6.78847 22.1891 7.13703 22.4223 7.49761 22.5937C7.85819 22.7652 8.23078 22.907 8.6154 23.0192L2.31732 40.4519L0.33654 42.3077ZM24.6635 42.3077L22.6827 40.4519L16.3846 23.0192C16.7692 22.907 17.1418 22.7652 17.5024 22.5937C17.863 22.4223 18.2115 22.1891 18.5481 21.8942L25 39.6923L24.6635 42.3077ZM12.5 18.75C10.7692 18.75 9.29488 18.141 8.07693 16.9231C6.85897 15.7051 6.25 14.2308 6.25 12.5C6.25 10.875 6.75881 9.51522 7.77644 8.42067C8.79407 7.32612 9.95192 6.67307 11.25 6.46153V0H13.75V6.46153C15.0481 6.67307 16.2059 7.32612 17.2236 8.42067C18.2412 9.51522 18.75 10.875 18.75 12.5C18.75 14.2308 18.141 15.7051 16.9231 16.9231C15.7051 18.141 14.2308 18.75 12.5 18.75ZM12.5 16.25C13.5289 16.25 14.4111 15.8822 15.1466 15.1466C15.8822 14.4111 16.25 13.5288 16.25 12.5C16.25 11.4712 15.8822 10.5889 15.1466 9.85337C14.4111 9.11779 13.5289 8.75001 12.5 8.75001C11.4712 8.75001 10.589 9.11779 9.85338 9.85337C9.1178 10.5889 8.75002 11.4712 8.75002 12.5C8.75002 13.5288 9.1178 14.4111 9.85338 15.1466C10.589 15.8822 11.4712 16.25 12.5 16.25Z"
                fill="#003D9B"
              />
            </svg>
          </div>
        </div>

        <div className="absolute top-6 right-10 w-12 h-12 -rotate-6 flex items-center justify-center bg-white p-2 rounded-lg shadow-md">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.21 18.9456L0.527629 12.9247L2.03793 11.5091L9.94348 16.4096L16.6574 9.97254L18.429 11.0432L10.21 18.9456ZM9.68216 13.9233L-0.000237577 7.90239L8.21876 -1.71587e-05L17.9012 6.02088L9.68216 13.9233ZM9.41561 11.3873L14.669 6.3606L8.48531 2.53601L3.23196 7.56267L9.41561 11.3873Z"
              fill="#0052CC"
            />
          </svg>
        </div>

        <div className="absolute bottom-6 left-10 w-10 h-10 -rotate-6 flex items-center justify-center bg-white p-2 rounded-lg shadow-md">
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.74856 16.8871C1.14537 16.7588 0.680095 16.4427 0.352745 15.9386C0.0253943 15.4346 -0.0741745 14.8809 0.0540379 14.2777L2.90243 0.877099C3.00292 0.404328 3.29318 0.120983 3.77319 0.0270649C4.25321 -0.066853 4.62159 0.0838647 4.87834 0.479218L6.61137 3.14785L5.01019 4.18767L5.54935 5.01791L7.15053 3.97809L9.15315 7.06185L7.55196 8.10167L8.09113 8.93191L9.69231 7.89209L11.6949 10.9758L10.0937 12.0157L10.6329 12.8459L12.2341 11.8061L14.2367 14.8898L12.6355 15.9297L13.1747 16.7599L14.7759 15.7201L16.3163 18.0922C16.5731 18.4876 16.5609 18.8854 16.2799 19.2857C15.9989 19.686 15.622 19.8359 15.1492 19.7355L1.74856 16.8871ZM3.15481 14.1189L11.2734 15.8446L4.88048 6.00032L3.15481 14.1189Z"
              fill="#737685"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2 flex flex-col items-center text-center my-6">
        <h1 className="text-[36px] font-semibold text-[#041B3C]">
          No Projects
        </h1>
        <p className="text-[18px] max-w-100 w-full font-normal text-[#434654] ">
          You don’t have any projects yet. Start by defining your first
          architectural workspace to begin tracking tasks and epics.
        </p>
      </div>
      <ButtonCreateProject />
    </div>
  );
}
