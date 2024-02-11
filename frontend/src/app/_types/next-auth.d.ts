import "next-auth";
import type { User } from "next-auth";
import { User as UserData } from "@type/user";
import "next-auth/jwt";
import { Group } from "@type/group";

// https://gist.github.com/degitgitagitya/db5c4385fc549f317eac64d8e5702f74

declare module "next-auth" {
  interface Session {
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      preferred_username: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      org_name?: string;
      telephone?: string;
      accessToken: string;
    };
    error: string;
    profile: UserData | null;
    activeGroup: Group | undefined;
  }

  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
    accessToken: string;
  }

  interface Account {
    provider: string;
    type: string;
    id: string;
    accessToken: string;
    accessTokenExpires?: any;
    refreshToken: string;
    idToken: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }

  interface Profile {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    sub: string;
    name: string;
    email: string;
    sub: string;
    idToken: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpired: number;
    refreshTokenExpired: number;
    user: User;
    error: string;
    profile: UserData | null;
    activeGroup: Group | undefined;
  }
}
