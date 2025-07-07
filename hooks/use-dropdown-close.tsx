import { useEffect, RefObject } from "react";

interface UseDropdownCloseProps {
  wrapperRef: RefObject<HTMLElement>;
  setIsOpen: (isOpen: boolean) => void;
}

export function useDropdownClose({
  wrapperRef,
  setIsOpen,
}: UseDropdownCloseProps) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wrapperRef, setIsOpen]);
}
