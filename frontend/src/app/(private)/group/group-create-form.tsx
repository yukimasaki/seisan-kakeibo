"use client";

import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createGroup, validateOnBlurDisplayName } from "./group-server-action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { showToast } from "@components/toast/toast";

export const GroupCreateFormComponent = ({}: {}) => {
  const [messageAfterSubmit, formAction] = useFormState(createGroup, {
    isSubmitted: false,
    ok: false,
    message: null,
    data: null,
  });

  const [displayNameValidateState, displayNameValidateAction] = useFormState(
    validateOnBlurDisplayName,
    {
      message: null,
    }
  );

  const [displayName, setDisplayName] = useState<string>("");

  const { data: session, update } = useSession();
  useEffect(() => {
    if (messageAfterSubmit.isSubmitted && messageAfterSubmit.ok) {
      const profile = {
        ...session?.profile,
        members: messageAfterSubmit.data?.members,
      };
      update({
        activeGroup: messageAfterSubmit.data,
        profile,
      });
      showToast({
        message: messageAfterSubmit.message || "",
        type: "success",
        timerProgressBar: true,
        timer: 5000,
      });
    } else if (messageAfterSubmit.isSubmitted && !messageAfterSubmit.ok) {
      showToast({
        message: messageAfterSubmit.message || "",
        type: "error",
        timerProgressBar: true,
        timer: 5000,
      });
    }
  }, [messageAfterSubmit]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showToast({
      message: "グループを作成してください",
      type: "warning",
      timerProgressBar: true,
      timer: 5000,
    });
    setLoading(false);
  }, [loading]);

  return (
    <form action={formAction} className="flex flex-col h-full p-2">
      <div className="flex-1">
        <Input
          label={"グループ名"}
          name="displayName"
          value={displayName}
          type={"text"}
          classNames={{
            input: "text-base",
          }}
          onChange={(e) => {
            setDisplayName(e.target.value);
            displayNameValidateAction(e.target.value);
          }}
          onBlur={(e) => {
            if (!(e.target instanceof HTMLInputElement)) return;
            displayNameValidateAction(e.target.value);
          }}
          onClear={() => setDisplayName("")}
          isClearable
        />
        {displayNameValidateState.message && (
          <p className="text-red-500">{displayNameValidateState.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <Button
          type="submit"
          color="primary"
          variant="flat"
          isDisabled={
            !!displayNameValidateState.message || !!messageAfterSubmit.ok
          }
          className="w-full"
        >
          保存
        </Button>
      </div>
    </form>
  );
};
