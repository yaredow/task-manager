"use client";

import { parseAsBoolean, useQueryState } from "nuqs";

export const useUpdateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "edit-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    open,
    close,
    isOpen,
    setIsOpen,
  };
};
