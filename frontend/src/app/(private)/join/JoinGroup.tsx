"use client";

import { FetchError, fetcher } from "@common/fetcher";
import { Spinner } from "@nextui-org/react";
import { InviteResponse } from "@type/entities/invite";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const JoinGroup = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();

  const {
    data: inviteResponse,
    error,
    isLoading,
  }: {
    data: InviteResponse;
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

  if (isLoading) return <Spinner />;

  return <div>{inviteResponse.groupId}</div>;
};
