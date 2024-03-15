import { Member, MemberResponse } from "@frontend/types/entities/member";
import { User } from "./user";

export type Group = {
  id: number;
  creatorId: number;
  uuid: string;
  displayName: string;
};

type AdditionalGroupInfo = {
  members: MemberResponse[];
};

type AdditionalUserInfo = {
  creator: User;
};

export type GroupResponse = Group & AdditionalGroupInfo & AdditionalUserInfo;

export type CreateGroupDto = Omit<Group, "id" | "uuid">;

export type UpdateGroupDto = Partial<Group>;

export type CreateGroupAndMemberDto = CreateGroupDto & {
  userId: number;
};
