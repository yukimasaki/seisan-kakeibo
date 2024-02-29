export type Invite = {
  token: string;
  groupId: number;
};

export type InviteResponse = Invite;

export type CreateInviteDto = {
  groupId: number;
};
