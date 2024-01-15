import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!register|api|login|welcome|test).*)"],
}

export default withAuth(
  function middleware(req) {
  },
  {
    callbacks: {
      // 認可に関する処理。トークンが存在していればOK
      authorized: ({ token }) => {
        if (!token || token.error) return false;
        return true;
      },
    },
  },
);
