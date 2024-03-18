import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { Toaster } from "@/components/ui/sonner";
import { CommandSearch } from "@/components/command-search";
import Nav from "@/components/nav";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Ld from "@/components/loader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        themes={[
          "light",
          "dark",
          "system",
          "chic",
          "jarr",
          "anwa",
          "site",
          "lact",
          "char",
          "sfbh",
          "korb",
          "gene",
        ]}
        disableTransitionOnChange
      >
        <Toaster icons={{ loading: <Ld /> }} />
        <CommandSearch />
        <div className="w-full h-2 bg-primary" />
        <div className="">
          <Nav />
          <div className="px-8 mx-2">{children}</div>
        </div>
      </ThemeProvider>
    </>
  );
}
