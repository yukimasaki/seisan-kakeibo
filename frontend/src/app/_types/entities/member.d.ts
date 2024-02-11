import { Group } from "@type/entities/group";
import { User } from "@type/entities/user";

export type Member = {
  userId: number;
  groupId: number;
  group: Group;
  user: User;
};
