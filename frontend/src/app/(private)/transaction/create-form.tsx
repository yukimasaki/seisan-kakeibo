"use client";

import useModalForm from "@hooks/useModalForm";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export const CreateTransactionForm = () => {
  const form = useModalForm();

  return (
    <Modal
      isOpen={form.isOpen}
      onClose={() => form.onClose()}
      placement="center"
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      backdrop="blur"
      hideCloseButton
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <div>
                新しい支出の登録
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-4">
                <Input
                  label={"金額"}
                  size="sm"
                />
                <Input
                  label={"タイトル"}
                  size="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color={"danger"} variant="light" onPress={() => form.onClose()}>閉じる</Button>
              <Button color={"primary"} onPress={() => form.onClose()}>作成</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
