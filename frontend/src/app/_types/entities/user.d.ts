import { Member } from "@type/entities/member";

export type User = {
  id: number;
  uuid: string;
  email: string;
  userName: string;
  membership: string;
  hashedPassword: string;
  belongingGroups: Member[];
};
