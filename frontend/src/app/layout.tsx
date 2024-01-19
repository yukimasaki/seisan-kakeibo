import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@common/next-auth/provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seisan家計簿",
  description: "Seisan家計簿は、精算・家計簿の記録を便利に行うWebアプリです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <html lang="ja">
        <body className={inter.className}>
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </body>
      </html>
    </NextAuthProvider>
  )
};
