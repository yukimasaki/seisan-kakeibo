import { Group } from "@type/entities/group";
import { User } from "@type/entities/user";

export type Member = {
  userId: number;
  groupId: number;
};

type AdditionalMemberInfo = {
  user: User;
  group: Group;
};

export type MemberResponse = Member & AdditionalMemberInfo;

export type CreateMemberDto = Member;

export type UpdateMemberDto = Partial<Member>;
