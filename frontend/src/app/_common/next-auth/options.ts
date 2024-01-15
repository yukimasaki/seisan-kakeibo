import { Account, NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { refreshAccessToken } from './utils';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET || '',
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: {
      token: JWT,
      user: User,
      account: Account | null,
    }) {
      // Initial sign in
      if (account && user) {
        token.idToken = account.id_token;

        // Add access_token, refresh_token and expirations to the token right after signin
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        token.accessTokenExpired =
          Date.now() + (account.expires_in - 15) * 1000;
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in - 15) * 1000;
        token.user = user;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpired) return token;

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: {
      session: Session,
      token: JWT,
    }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  events: {
    signOut: async (message) => {
      const issuerUri = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER;
      const authOriginUri = encodeURIComponent(process.env.NEXTAUTH_URL || '');
      const idToken = message.token.idToken;

      const signOutUrl = `${issuerUri}/protocol/openid-connect/logout?post_logout_redirect_uri=${authOriginUri}&id_token_hint=${idToken}`;
      await fetch(signOutUrl);
    },
  },
}
