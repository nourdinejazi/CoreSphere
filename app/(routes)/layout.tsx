import { Toaster } from "@/components/ui/sonner";
import { CommandSearch } from "@/components/command-search";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "@/components/nav";
import { ResisableClient } from "@/components/resisable-client";

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
        <Toaster />
        <CommandSearch />
        <div className="w-full h-2 bg-primary" />
        <div className="">
          <Nav />
          <div className="  print:px-0   print:mx-0 ">
            <ResisableClient
              defaultLayout={undefined}
              defaultCollapsed={true}
              navCollapsedSize={4}
            >
              {children}
            </ResisableClient>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
