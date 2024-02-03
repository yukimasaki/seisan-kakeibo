"use client";

import {
  upsertProfile,
  validateOnBlurEmail,
  validateOnBlurUserName,
} from "@components/action/profile";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { PositionCenterWrapperComponent } from "@components/layout/position-center-wrapper";
import { User } from "@type/user";
import { useSession } from "next-auth/react";

export const ProfileFormComponent = ({ user }: { user: User }) => {
  const [messageAfterSubmit, formAction] = useFormState(upsertProfile, {
    ok: null,
    message: null,
    data: null,
  });

  const [emailValidateState, validateEmailAction] = useFormState(
    validateOnBlurEmail,
    {
      message: null,
    }
  );

  const [userNameValidateState, validateUserNameAction] = useFormState(
    validateOnBlurUserName,
    {
      message: null,
    }
  );

  const uuid = user.uuid;
  const [email, setEmail] = useState<string>(user.email);
  const [userName, setUserName] = useState<string>(user.userName);

  // update関数はコールバックにオブジェクトを渡しているだけなので、データの格納はコールバック側で行う必要がある
  // https://qiita.com/kage1020/items/8224efd0f3557256c541#%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E6%9B%B4%E6%96%B0
  const { data: session, update } = useSession();
  useEffect(() => {
    if (messageAfterSubmit.ok) {
      update({ profile: messageAfterSubmit.data });
    }
  }, [update, messageAfterSubmit.ok, messageAfterSubmit.data]);

  return (
    <>
      <PositionCenterWrapperComponent>
        <Card className="w-full h-fit max-w-[720px]">
          <CardHeader className="flex gap-3">
            <p>プロフィール設定</p>
          </CardHeader>
          <form action={formAction}>
            <CardBody className="space-y-3">
              <Input
                label="ユーザーID"
                name="uuid"
                value={uuid}
                type="text"
                readOnly
              />

              <Input
                label="メールアドレス"
                name="email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmailAction(e.target.value);
                }}
                onBlur={(e) => {
                  if (!(e.target instanceof HTMLInputElement)) return;
                  validateEmailAction(e.target.value);
                }}
                onClear={() => setEmail("")}
                isClearable
              />
              {emailValidateState.message && (
                <p className="text-red-500">{emailValidateState.message}</p>
              )}

              <Input
                label="ユーザー名"
                name="userName"
                value={userName}
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                  validateUserNameAction(e.target.value);
                }}
                onBlur={(e) => {
                  if (!(e.target instanceof HTMLInputElement)) return;
                  validateUserNameAction(e.target.value);
                }}
                onClear={() => setUserName("")}
                isClearable
              />
              {userNameValidateState.message && (
                <p className="text-red-500">{userNameValidateState.message}</p>
              )}
            </CardBody>
            <CardFooter>
              <div className="space-y-2">
                <Button
                  type="submit"
                  color="primary"
                  variant="flat"
                  isDisabled={
                    !!emailValidateState.message ||
                    !!userNameValidateState.message
                  }
                >
                  保存
                </Button>
                {messageAfterSubmit.message && (
                  <p
                    className={
                      messageAfterSubmit.ok ? "text-green-500" : "text-red-500"
                    }
                  >
                    {messageAfterSubmit.message}
                  </p>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </PositionCenterWrapperComponent>
    </>
  );
};
