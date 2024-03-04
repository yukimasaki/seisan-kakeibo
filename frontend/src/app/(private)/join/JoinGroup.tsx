"use client";

import { FetchError, fetcher } from "@common/fetcher";
import { PositionCenterWrapperComponent } from "@components/layout/position-center-wrapper";
import { ParagraphComponent } from "@components/text/paragraph";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react";
import { FindInviteResponse } from "@type/entities/invite";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import useSWR from "swr";
import { joinGroup } from "./join-server-action";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { showToast } from "@components/toast/toast";
import { InvalidInviteToken } from "./InvalidInviteToken";

export const JoinGroup = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();

  const {
    data: inviteResponse,
    error,
    isLoading,
  }: {
    data: FindInviteResponse;
    error: FetchError | undefined;
    isLoading: boolean;
  } = useSWR(
    {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/invites/${token}`,
      token: null,
    },
    fetcher,
    {
      keepPreviousData: true,
      onErrorRetry: (error) => {
        if (!error.ok) return;
      },
    }
  );

  const [messageAfterSubmit, formAction] = useFormState(joinGroup, {
    isSubmitted: false,
    ok: false,
    message: null,
  });

  const { update } = useSession();
  useEffect(() => {
    if (messageAfterSubmit.isSubmitted && messageAfterSubmit.ok) {
      update();
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
    messageAfterSubmit.isSubmitted = false;
  }, [messageAfterSubmit]);

  if (isLoading) return <Spinner />;

  if (error) return <InvalidInviteToken />;
  return (
    <PositionCenterWrapperComponent>
      <Card className="flex justify-between w-full h-fit max-w-[500px]">
        <CardHeader className="flex flex-col items-center gap-3">
          <h5 className={"text-blue-400 font-bold text-3xl pt-4"}>
            {inviteResponse.group.displayName}
          </h5>
        </CardHeader>
        <form action={formAction}>
          <CardBody className="space-y-4 items-center">
            <ParagraphComponent>
              作成者: {inviteResponse.group.creator.userName}
            </ParagraphComponent>
            <input
              name={"groupId"}
              value={inviteResponse.groupId}
              hidden
              readOnly
            />
            <input name={"inviteToken"} value={token} hidden readOnly />
          </CardBody>
          <CardFooter className="justify-center space-x-4 pb-4">
            <Button color={"danger"} variant={"light"}>
              拒否する
            </Button>
            <Button type={"submit"} color={"primary"}>
              参加する
            </Button>
          </CardFooter>
        </form>
      </Card>
    </PositionCenterWrapperComponent>
  );
};
