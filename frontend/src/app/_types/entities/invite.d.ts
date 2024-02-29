import { GroupResponse } from "./group";

export type Invite = {
  token: string;
  groupId: number;
};

export type CreateInviteResponse = Invite;

type AdditionalGroupInfo = {
  group: GroupResponse;
};

export type FindInviteResponse = Invite & AdditionalGroupInfo;

export type CreateInviteDto = {
  groupId: number;
};
