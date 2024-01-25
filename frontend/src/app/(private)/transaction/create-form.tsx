"use client";

import useModalForm from "@hooks/useModalForm";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

export const CreateTransactionForm = () => {
  const form = useModalForm();
  return (
    <Modal
      isOpen={form.isOpen}
      onClose={() => form.onClose()}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody>
            test
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
