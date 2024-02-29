import { Member, MemberResponse } from "@type/entities/member";
import { User } from "./user";

export type Group = {
  id: number;
  creatorId: number;
  uuid: string;
  displayName: string;
};

type AddtionalGroupInfo = {
  members: MemberResponse[];
};

type AdditionalUserInfo = {
  creator: User;
};

export type GroupResponse = Group & AddtionalGroupInfo & User;

export type CreateGroupDto = Omit<Group, "id">;

export type UpdateGroupDto = Partial<Group>;
