"use client";

import ResponsiveModal from "@/components/responsive-modal";
import UpdateTaskFormWrapper from "./update-task-form-wrapper";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";

export const EditTaskModal = () => {
  const { isOpen, setIsOpen, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <UpdateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
