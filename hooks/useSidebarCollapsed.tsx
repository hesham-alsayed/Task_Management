"use client";

import { useEffect, useState } from "react";

export function useSidebarCollapsed() {
  const [collapsed, setCollapsedState] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");

    if (saved !== null) {
      setCollapsedState(JSON.parse(saved));
    }
  }, []);

  const setCollapsed = (value: boolean) => {
    setCollapsedState(value);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(value));
  };

  const toggle = () => {
    setCollapsedState((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newValue));
      return newValue;
    });
  };

  return {
    collapsed,
    setCollapsed,
    toggle,
  };
}
