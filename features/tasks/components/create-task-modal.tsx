import ResponsiveModal from "@/components/responsive-modal";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import CreateTaskForm from "./create-task-form";
import CreateTaskFormWrapper from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
