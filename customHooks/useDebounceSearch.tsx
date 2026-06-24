"use client";
import { useEffect, useState } from "react";

export default function useDebounceSearch(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(time);
  }, [value]);

  return debounceValue;
}
