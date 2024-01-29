import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!register|api|login|welcome|test|profile).*)"],
}

export default withAuth(
  async function middleware(req) {
    // authorized === trueの場合に実行される処理
    const token = req.nextauth.token;

    const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token?.accessToken}`,
      },
    });

    const isUserNotCreated = user.status === 404 ? true : false;

    if (isUserNotCreated) {
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
