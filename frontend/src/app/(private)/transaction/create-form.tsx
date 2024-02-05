"use client";

import { CalendarComponent } from "@components/calendar";
import { useDatePickerCalendar } from "@hooks/useCalendar";
import useModalForm from "@hooks/useModalForm";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { Summary } from "@type/calendar";
import { createSummary } from "@utils/createSummary";

export const CreateTransactionForm = () => {
  const form = useModalForm();
  const calendarStore = useDatePickerCalendar();

  const summaries: Summary[] = createSummary({
    now: calendarStore.currentYearMonth,
  });

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
              <div>新しい支出の登録</div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-4">
                <Input label={"金額"} size="sm" />

                <Input label={"タイトル"} size="sm" />

                <Popover placement={"top"}>
                  <PopoverTrigger>
                    <Input
                      label={"支払日"}
                      value={calendarStore.selectedDate}
                      size="sm"
                      readOnly
                      classNames={{
                        input: "text-left",
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <CalendarComponent
                      summaries={summaries}
                      store={useDatePickerCalendar}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color={"danger"}
                variant="light"
                onPress={() => form.onClose()}
              >
                閉じる
              </Button>
              <Button color={"primary"} onPress={() => form.onClose()}>
                作成
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
