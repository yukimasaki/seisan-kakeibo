import { ModalForm } from "@type/modal-form";
import { create } from "zustand";

const useModalForm = create<ModalForm>((set) => ({
  isOpen: false,
  onOpen: () => set({
    isOpen: true,
  }),
  onClose: () => set({
    isOpen: false,
  }),
}));

export default useModalForm;
