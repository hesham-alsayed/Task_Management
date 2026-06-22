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


export const statusTasksOptions = [
  {
    value: "TO_DO",
    label: "To Do",
    bg: "#E8EDFF",
    color: "#003D9B",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    bg: "#FFF4D6",
    color: "#B7791F",
  },
  {
    value: "BLOCKED",
    label: "Blocked",
    bg: "#FEE2E2",
    color: "#DC2626",
  },
  {
    value: "IN_REVIEW",
    label: "In Review",
    bg: "#EDE9FE",
    color: "#7C3AED",
  },
  {
    value: "READY_FOR_QA",
    label: "Ready For QA",
    bg: "#DBEAFE",
    color: "#2563EB",
  },
  {
    value: "REOPENED",
    label: "Reopened",
    bg: "#FFE4E6",
    color: "#E11D48",
  },
  {
    value: "READY_FOR_PRODUCTION",
    label: "Ready For Production",
    bg: "#DCFCE7",
    color: "#15803D",
  },
  {
    value: "DONE",
    label: "Done",
    bg: "#D1FAE5",
    color: "#059669",
  },
];

export const statusStylesBadge = {
  TO_DO: {
    bg: "#DCE8FF",
    text: "#003D9B",
  },
  IN_PROGRESS: {
    bg: "#FFE7B3",
    text: "#8A5300",
  },
  BLOCKED: {
    bg: "#FFD6D6",
    text: "#B00020",
  },
  IN_REVIEW: {
    bg: "#E7DBFF",
    text: "#5B21B6",
  },
  READY_FOR_QA: {
    bg: "#D6E8FF",
    text: "#0047B3",
  },
  REOPENED: {
    bg: "#FFD9E2",
    text: "#BE123C",
  },
  READY_FOR_PRODUCTION: {
    bg: "#D6FFE6",
    text: "#0F6B3E",
  },
  DONE: {
    bg: "#82F9BE",
    text: "#002113",
  },
};




