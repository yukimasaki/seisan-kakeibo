import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!register|api|login|welcome|test|profile).*)"],
}

export default withAuth(
  async function middleware(req) {
    // authorized === trueの場合に実行される処理
    const token = req.nextauth.token;
    const myProfile = req.nextauth.token?.profile;

    if (!myProfile) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
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
