import { GroupResponse } from "./group";

export type Invite = {
  token: string;
  groupId: number;
};

export type CreateInviteResponse = Invite;

export type FindInviteResponse = Invite & GroupResponse;

export type CreateInviteDto = {
  groupId: number;
};
