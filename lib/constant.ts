export const accessToken = "access_token";
export const refreshToken = "refresh_token";

export const ACCESS_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 10,
};

export const REFRESH_TOKEN_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 2592000,
};


export const statusEpicOptions =  [
  {
    value: "TO_DO",
    label: "To Do",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "BLOCKED",
    label: "Blocked",
  },
  {
    value: "IN_REVIEW",
    label: "In Review",
  },
  {
    value: "READY_FOR_QA",
    label: "Ready For QA",
  },
  {
    value: "REOPENED",
    label: "Reopened",
  },
  {
    value: "READY_FOR_PRODUCTION",
    label: "Ready For Production",
  },
  {
    value: "DONE",
    label: "Done",
  },
];