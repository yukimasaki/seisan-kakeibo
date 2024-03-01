import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  // reason: "$" は "/" (ルートパス)を表している
  matcher: ["/((?!register|api|login|$|about).*)"],
};

export default withAuth(
  async function middleware(req) {
    // authorized === trueの場合に実行される処理
    const host = process.env.NEXTAUTH_URL;
    const path = req.nextUrl.pathname;
    const search = req.nextUrl.search;
    const fromPath = host + path + search;

    const myProfile = req.nextauth.token?.profile;
    if (!myProfile && path !== "/profile") {
      const redirectUrl = new URL("/profile", req.url);
      redirectUrl.searchParams.append("from", fromPath);
      return NextResponse.redirect(redirectUrl);
    }

    const activeGroup = req.nextauth.token?.profile?.activeGroup;
    if (myProfile && !activeGroup && path !== "/group" && path !== "/join") {
      const redirectUrl = new URL("/group", req.url);
      redirectUrl.searchParams.append("from", fromPath);
      return NextResponse.redirect(redirectUrl);
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
  }
);
