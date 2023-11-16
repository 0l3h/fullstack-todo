import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import QueryProvider from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
