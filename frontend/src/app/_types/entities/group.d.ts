import { Member } from "@type/entities/member";

export type Group = {
  id: number;
  uuid: string;
  displayName: string;
};

type AddtionalGroupInfo = {
  members: Member[];
};

export type GroupResponse = Group & AddtionalGroupInfo;

export type CreateGroupDto = Omit<Group, "id">;

export type UpdateGroupDto = Partial<Group>;
