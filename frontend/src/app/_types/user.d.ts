import { Member } from "@type/member";

export type User = {
  id: number;
  uuid: string;
  email: string;
  userName: string;
  membership: string;
  hashedPassword: string;
  belongingGroups: Member[];
};
