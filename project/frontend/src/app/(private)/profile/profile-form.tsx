"use client";

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
import { PositionCenterWrapperComponent } from "@frontend/components/layout/position-center-wrapper";
import { UserResponse } from "@frontend/types/entities/user";
import { useSession } from "next-auth/react";
import { showToast } from "@frontend/components/toast/toast";
import {
  upsertProfile,
  validateOnBlurEmail,
  validateOnBlurUserName,
} from "./profile-server-action";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const ProfileFormComponent = ({ user }: { user: UserResponse }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [messageAfterSubmit, formAction] = useFormState(upsertProfile, {
    isSubmitted: false,
    ok: false,
    message: null,
  });

  const [emailValidateState, validateEmailAction] = useFormState(
    validateOnBlurEmail,
    {
      message: null,
    },
  );

  const [userNameValidateState, validateUserNameAction] = useFormState(
    validateOnBlurUserName,
    {
      message: null,
    },
  );

  const uuid = user.uuid;
  const [email, setEmail] = useState<string>(user.email);
  const [userName, setUserName] = useState<string>(user.userName);

  // update関数はコールバックにオブジェクトを渡しているだけなので、データの格納はコールバック側で行う必要がある
  // https://qiita.com/kage1020/items/8224efd0f3557256c541#%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E6%9B%B4%E6%96%B0
  const { data: session, update } = useSession();
  useEffect(() => {
    if (messageAfterSubmit.isSubmitted && messageAfterSubmit.ok) {
      update();
      showToast({
        message: messageAfterSubmit.message || "",
        type: "success",
        timerProgressBar: true,
        timer: 5000,
      });
      router.refresh();
    } else if (messageAfterSubmit.isSubmitted && !messageAfterSubmit.ok) {
      showToast({
        message: messageAfterSubmit.message || "",
        type: "error",
        timerProgressBar: true,
        timer: 5000,
      });
    }
    messageAfterSubmit.isSubmitted = false;
  }, [messageAfterSubmit]);

  useEffect(() => {
    if (!user.userName) {
      showToast({
        message: "プロフィールを設定してください",
        type: "warning",
        timerProgressBar: true,
        timer: 5000,
      });
    }
  }, [user.userName]);

  useEffect(() => {
    // URLに`from`クエリパラメータが存在する場合はリダイレクトする
    const fromUrl = searchParams.get("from");
    if (fromUrl) {
      router.push(fromUrl);
    }
  }, [session, router]);

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
                classNames={{
                  input: "text-base",
                }}
                readOnly
              />

              <Input
                label="メールアドレス"
                name="email"
                value={email}
                type="email"
                classNames={{
                  input: "text-base",
                }}
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
                classNames={{
                  input: "text-base",
                }}
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
                  color="warning"
                  isDisabled={
                    !!emailValidateState.message ||
                    !!userNameValidateState.message
                  }
                >
                  保存
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </PositionCenterWrapperComponent>
    </>
  );
};
