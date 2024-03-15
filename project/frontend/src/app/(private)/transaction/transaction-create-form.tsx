"use client";

import { Calendar } from "@frontend/components/Calendar";
import { useDatePickerCalendar } from "@frontend/hooks/useCalendar";
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
  Spacer,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Summary } from "@frontend/types/calendar";
import { CategoryResponse } from "@frontend/types/entities/category";
import { createSummary } from "@frontend/utils/createSummary";
import { useFormState, useFormStatus } from "react-dom";
import {
  Keys,
  clearMessages,
  createTransaction,
  validateOnBlur,
} from "./transaction-server-action";
import React, { useEffect, useState } from "react";
import { useModalForm } from "@frontend/hooks/useToggle";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { MetaInfoComponent } from "./form/MetaInfo";
import { BalanceInputComponent } from "./form/BalanceInput";
import { FinalBillComponent } from "./form/FinalBill";
import { showToast } from "@frontend/components/toast/toast";
import { PaymentType } from "@frontend/types/entities/transaction";
import useSWR from "swr";
import { FetchError, fetcher } from "@frontend/common/fetcher";

export const CreateTransactionForm = () => {
  const { data: session } = useSession();
  const groupId = session?.profile?.activeGroupId || 0;

  const [messageAfterSubmit, formAction] = useFormState(createTransaction, {
    isSubmitted: false,
    ok: false,
    message: null,
  });

  // issue: 連動していない気がする
  const formStatus = useFormStatus();

  const [validateState, validateAction] = useFormState(validateOnBlur, {
    message: new Map<Keys, string>(),
  });

  // 成否をトーストで通知
  useEffect(() => {
    if (messageAfterSubmit.isSubmitted && messageAfterSubmit.ok) {
      showToast({
        message: messageAfterSubmit.message || "",
        type: "success",
        timerProgressBar: true,
        timer: 5000,
      });
      form.onClose();
      clear();
    } else if (messageAfterSubmit.isSubmitted && !messageAfterSubmit.ok) {
      showToast({
        message: messageAfterSubmit.message || "",
        type: "error",
        timerProgressBar: true,
        timer: 5000,
      });
    }
  }, [messageAfterSubmit]);

  const form = useModalForm();
  const calendarStore = useDatePickerCalendar();

  // input
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTab, setSelectedTab] = useState<PaymentType>("ratio");
  const clear = () => {
    setAmount("");
    setCategoryId("");
    setTitle("");
    setSelectedTab("ratio");
    calendarStore.setSelectedDate(dayjs().format("YYYY-MM-DD"));
    validateState.message.clear();
    clearMessages();
  };

  const summaries: Summary[] = createSummary({
    now: calendarStore.currentYearMonth,
  });

  // DBへカテゴリー情報を問い合わせ
  const {
    data: dbCategories,
    error,
    isLoading,
  }: {
    data: CategoryResponse[];
    error: FetchError | undefined;
    isLoading: boolean;
  } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?groupId=${groupId}`,
      token: null,
    },
    fetcher,
    {
      keepPreviousData: true,
      onErrorRetry: (error) => {
        if (!error.ok) return;
      },
    },
  );

  // DBにカテゴリー情報が保存されていないときに使うデフォルト値
  const defaultCategories: CategoryResponse[] = [
    { id: 1, icon: "", categoryName: "日用品" },
    { id: 2, icon: "", categoryName: "光熱費" },
    { id: 3, icon: "", categoryName: "通信費" },
    { id: 4, icon: "", categoryName: "食費" },
    { id: 5, icon: "", categoryName: "外食費" },
    { id: 6, icon: "", categoryName: "美容費" },
    { id: 7, icon: "", categoryName: "付き合い" },
    { id: 8, icon: "", categoryName: "ペット" },
    { id: 9, icon: "", categoryName: "交通・車両費" },
    { id: 10, icon: "", categoryName: "住居費" },
    { id: 11, icon: "", categoryName: "趣味" },
    { id: 12, icon: "", categoryName: "自己啓発" },
    { id: 13, icon: "", categoryName: "分類不能" },
  ];

  // DBにカテゴリー情報が存在しない場合はデフォルト値を代入する
  const categories = (() => {
    if (error) return defaultCategories;
    return dbCategories;
  })();

  const paymentTable = ({ method }: { method: PaymentType }) => {
    const members = session?.profile.activeGroup.members;
    if (!members) return null;
    return (
      <>
        <MetaInfoComponent />
        <h5 className="text-base font-bold text-amber-400">
          誰といくら割り勘する？
        </h5>
        <BalanceInputComponent method={method} />
        <Spacer y={4} />
        <h5 className="text-base font-bold text-amber-400">
          誰がいくら立て替えた？
        </h5>
        <FinalBillComponent />
        <Spacer y={4} />
      </>
    );
  };

  const tabs: {
    key: PaymentType;
    label: string;
    content: React.ReactNode;
  }[] = [
    {
      key: "ratio",
      label: "比率",
      content: paymentTable({
        method: "ratio",
      }),
    },
    {
      key: "even",
      label: "均等",
      content: paymentTable({
        method: "even",
      }),
    },
    {
      key: "amount_basis",
      label: "金額",
      content: paymentTable({
        method: "amount_basis",
      }),
    },
  ];

  return (
    <Modal
      isOpen={form.isOpen}
      placement="top"
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
                  <Input
                    label={"金額"}
                    name={"amount"}
                    value={amount}
                    type={"number"}
                    inputMode={"numeric"}
                    size={"sm"}
                    classNames={{
                      input: "text-base",
                    }}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      validateAction({
                        method: selectedTab,
                        key: "amount",
                        value:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      });
                    }}
                    onBlur={(e) => {
                      if (!(e.target instanceof HTMLInputElement)) return;
                      validateAction({
                        method: selectedTab,
                        key: "amount",
                        value: !e.target.value
                          ? undefined
                          : Number(e.target.value),
                      });
                    }}
                    onClear={() => setAmount("")}
                    isClearable
                  />
                  {validateState.message && (
                    <p className="text-red-500">
                      {validateState.message.get("amount")}
                    </p>
                  )}

                  <Select
                    label={"カテゴリー"}
                    name={"categoryId"}
                    value={categoryId}
                    defaultSelectedKeys={[
                      `${Math.min(
                        ...categories.map((category) => category.id),
                      )}`,
                    ]}
                    items={categories}
                    placeholder={"カテゴリーを選択"}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      validateAction({
                        method: selectedTab,
                        key: "categoryId",
                        value:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      });
                    }}
                    onBlur={(e) => {
                      if (!(e.target instanceof HTMLInputElement)) return;
                      validateAction({
                        method: selectedTab,
                        key: "categoryId",
                        value:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      });
                    }}
                  >
                    {(category) => (
                      <SelectItem key={category.id}>
                        {category.categoryName}
                      </SelectItem>
                    )}
                  </Select>
                  {validateState.message && (
                    <p className="text-red-500">
                      {validateState.message.get("categoryId")}
                    </p>
                  )}

                  <Input
                    label={"タイトル"}
                    name={"title"}
                    value={title}
                    size={"sm"}
                    classNames={{
                      input: "text-base",
                    }}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      validateAction({
                        method: selectedTab,
                        key: "title",
                        value:
                          e.target.value === "" ? undefined : e.target.value,
                      });
                    }}
                    onBlur={(e) => {
                      if (!(e.target instanceof HTMLInputElement)) return;
                      validateAction({
                        method: selectedTab,
                        key: "title",
                        value:
                          e.target.value === "" ? undefined : e.target.value,
                      });
                    }}
                    onClear={() => setTitle("")}
                    isClearable
                  />
                  {validateState.message && (
                    <p className="text-red-500">
                      {validateState.message.get("title")}
                    </p>
                  )}

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
                      <Calendar
                        summaries={summaries}
                        store={useDatePickerCalendar}
                      />
                    </PopoverContent>
                  </Popover>
                  <input
                    name={"paymentDate"}
                    value={calendarStore.selectedDate}
                    hidden
                    readOnly
                  />

                  <Tabs
                    items={tabs}
                    selectedKey={selectedTab}
                    onSelectionChange={(tab) =>
                      setSelectedTab(tab as PaymentType)
                    }
                  >
                    {(tab) => (
                      <Tab key={tab.key} title={tab.label}>
                        <input
                          name={"method"}
                          value={tab.key}
                          hidden
                          readOnly
                        />
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
                  onPress={() => {
                    form.onClose();
                    clear();
                  }}
                >
                  閉じる
                </Button>
                <Button
                  type={"submit"}
                  color={"warning"}
                  isDisabled={formStatus.pending}
                  isLoading={formStatus.pending}
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
