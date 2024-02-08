"use client";

import { CalendarComponent } from "@components/calendar";
import { useDatePickerCalendar } from "@hooks/useCalendar";
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
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Summary } from "@type/calendar";
import { Category } from "@type/category";
import { createSummary } from "@utils/createSummary";
import { useFormState } from "react-dom";
import { createTransaction, validateOnBlur } from "./transaction-server-action";
import { useState } from "react";
import { useModalForm } from "@hooks/useToggle";

export const CreateTransactionForm = () => {
  const [messageAfterSubmit, formAction] = useFormState(createTransaction, {
    isSubmitted: false,
    ok: false,
    message: null,
    data: null,
  });

  const form = useModalForm();
  const calendarStore = useDatePickerCalendar();

  const summaries: Summary[] = createSummary({
    now: calendarStore.currentYearMonth,
  });

  // dummy
  const categories: Category[] = [
    { id: 1, icon: "", category: "日用品" },
    { id: 2, icon: "", category: "光熱費" },
    { id: 3, icon: "", category: "通信費" },
    { id: 4, icon: "", category: "食費" },
    { id: 5, icon: "", category: "外食費" },
    { id: 6, icon: "", category: "美容費" },
    { id: 7, icon: "", category: "付き合い" },
    { id: 8, icon: "", category: "ペット" },
    { id: 9, icon: "", category: "交通・車両費" },
    { id: 10, icon: "", category: "住居費" },
    { id: 11, icon: "", category: "趣味" },
    { id: 12, icon: "", category: "自己啓発" },
    { id: 13, icon: "", category: "分類不能" },
  ];

  const [selectedTab, setSelectedTab] = useState("ratio");
  const tabs = [
    {
      key: "ratio",
      label: "比率",
      content: "比率!!",
    },
    {
      key: "even",
      label: "均等",
      content: "均等!!",
    },
    {
      key: "amount_basis",
      label: "金額",
      content: "金額!!",
    },
  ];

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
      <form action={formAction}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <div>新しい支出の登録</div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col space-y-4">
                  <Button
                    onPress={() => {
                      validateOnBlur({
                        tag: selectedTab,
                        key: "amount",
                        value: 10000,
                      });
                    }}
                  >
                    test
                  </Button>

                  <Input
                    label={"金額"}
                    name={"amount"}
                    inputMode={"numeric"}
                    size={"sm"}
                    classNames={{
                      input: "text-base",
                    }}
                  />
                  <Select
                    label={"カテゴリー"}
                    name={"categoryId"}
                    items={categories}
                    placeholder={"カテゴリーを選択"}
                  >
                    {(category) => (
                      <SelectItem key={category.id}>
                        {category.category}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    label={"タイトル"}
                    name={"title"}
                    size={"sm"}
                    classNames={{
                      input: "text-base",
                    }}
                  />
                  <Popover placement={"top"}>
                    <PopoverTrigger>
                      <Input
                        label={"支払日"}
                        name={"paymentDate"}
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
                  <Tabs
                    items={tabs}
                    onSelectionChange={(tab) => setSelectedTab(tab.toString())}
                  >
                    {(tab) => (
                      <Tab key={tab.key} title={tab.label}>
                        <input name={"tag"} value={tab.key} hidden readOnly />
                        <div>{tab.content}</div>
                      </Tab>
                    )}
                  </Tabs>
                  <Textarea
                    label={"備考"}
                    name={"memo"}
                    classNames={{
                      input: "text-base",
                    }}
                  />
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
                <Button
                  type={"submit"}
                  color={"primary"}
                  variant={"flat"}
                  onPress={() => form.onClose()}
                >
                  作成
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};
