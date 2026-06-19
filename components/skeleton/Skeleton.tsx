import React from "react";

type Props = {
  className?: string;
};

export default function Skeleton({ className = "" }: Props) {
  return (
    <div
      className={`animate-pulse bg-skeleton rounded-md ${className}`}
    />
  );
}