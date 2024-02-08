import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  // reason: "$" は "/" (ルートパス)を表している
  matcher: ["/((?!register|api|login|$).*)"],
};

export default withAuth(
  async function middleware(req) {
    // authorized === trueの場合に実行される処理
    const path = req.nextUrl.pathname;

    const myProfile = req.nextauth.token?.profile;
    if (!myProfile && path !== "/profile") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    const activeGroup = req.nextauth.token?.activeGroup;
    if (myProfile && !activeGroup && path !== "/group") {
      return NextResponse.redirect(new URL("/group", req.url));
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
