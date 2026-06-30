import { RefObject, useEffect } from "react";

type UseClickOutsideProps = {
  ref: RefObject<HTMLElement | null>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useClickOutside({ ref, isOpen, setIsOpen }: UseClickOutsideProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!ref) return;
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, ref, setIsOpen]);
}
