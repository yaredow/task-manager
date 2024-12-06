"use client";

import { parseAsString, useQueryState } from "nuqs";

export const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    open,
    close,
    taskId,
    setTaskId,
  };
};
