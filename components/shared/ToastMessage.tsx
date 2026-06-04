"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error";

type Props = {
  message: string;
  type?: ToastType;
  duration?: number;
  autoClose?: boolean;
};

const styles = {
  success: {
    wrapper: "bg-black border border-black",
    text: "text-white",
    icon: "text-white",
    iconText: "✔",
  },
  error: {
    wrapper: "bg-red-700 border border-red-700",
    text: "text-white",
    icon: "text-white",
    iconText: "⚠",
  },
};

export default function ToastMessage({
  message,
  type = "error",
  duration = 4000,
  autoClose = true,
}: Props) {
  const [visible, setVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      setAnimateOut(true);

      // wait animation then remove
      setTimeout(() => {
        setVisible(false);
      }, 250);
    }, duration);

    return () => clearTimeout(timer);
  }, [autoClose, duration]);

  if (!visible) return null;

  const style = styles[type];

  return (
    <div className="fixed bottom-4 right-4 z-1001">
      <div
        className={`
          flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg
          ${style.wrapper}
          ${animateOut ? "toast-exit" : "toast-enter"}
        `}
      >
        {/* icon */}
        <div className={style.icon}>{style.iconText}</div>

        {/* message */}
        <div className={`text-sm max-w-[260px] ${style.text}`}>{message}</div>

        {/* close */}
        <button
          onClick={() => {
            setAnimateOut(true);
            setTimeout(() => setVisible(false), 250);
          }}
          className="ml-2 text-white hover:cursor-pointer opacity-70 hover:opacity-100"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
