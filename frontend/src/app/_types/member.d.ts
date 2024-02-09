import { Group } from "@type/group";
import { User } from "@type/user";

export type Member = {
  userId: number;
  groupId: number;
  group: Group;
  user: User;
};
