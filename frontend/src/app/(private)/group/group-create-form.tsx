"use client";

import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createGroup, validateOnBlurDisplayName } from "./group-server-action";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const GroupFormComponent = ({
}: {
  }) => {
  const [messageAfterSubmit, formAction] = useFormState(createGroup, {
    ok: null,
    message: null,
    data: null,
  });

  const [displayNameValidateState, displayNameValidateAction] = useFormState(validateOnBlurDisplayName, {
    message: null,
  });

  const [displayName, setDisplayName] = useState<string>("");

  const { data: session, update } = useSession();
  useEffect(() => {
    if (messageAfterSubmit.ok) {
      update({ activeGroup: messageAfterSubmit.data });
    };
  }, [messageAfterSubmit.ok, messageAfterSubmit.data]);

  return (
    <form
      action={formAction}
      className="flex flex-col p-2 h-svh"
    >
      <div className="flex-1">
        <Input
          label={"グループ名"}
          name="displayName"
          value={displayName}
          type={"text"}
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
        {
          displayNameValidateState.message &&
          <p className="text-red-500">{displayNameValidateState.message}</p>
        }
      </div>
      <div className="flex flex-col">
        <Button
          type="submit"
          color="primary"
          variant="flat"
          isDisabled={!!displayNameValidateState.message || !!messageAfterSubmit.ok}
          className="w-full">
          保存
        </Button>
        {
          messageAfterSubmit.message &&
          <p className={messageAfterSubmit.ok ? "text-green-500" : "text-red-500"}>{messageAfterSubmit.message}</p>
        }
      </div>
    </form>
  );
};
