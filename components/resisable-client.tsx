"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Nav } from "./resisable-nav";
import {
  ArchiveX,
  Inbox,
  Send,
  File,
  Trash2,
  Archive,
  Users2,
  AlertCircle,
  MessagesSquare,
  ShoppingCart,
} from "lucide-react";
import { NavCombo } from "@/components/nav-combo";
import { usePathname } from "next/navigation";

interface ResisableClientProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export function ResisableClient({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children,
}: ResisableClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const pathname = usePathname().split("/");
  const notHomePage = pathname.length > 0;

  console.log(pathname);
  const links1 = [
    {
      href: notHomePage ? `/${pathname[1]}/gestioncheques` : "/",
      label: "Chèques en caisse",
      active: pathname.length == 3,
      icon: Inbox,
      variant: "default",
    },
    {
      href: notHomePage ? `/${pathname[1]}/gestioncheques/reglement` : "/",
      label: "Règlements chéques",
      active: pathname.includes(`reglement`),
      icon: File,
    },
    {
      href: notHomePage ? `/${pathname[1]}/gestioncheques/versement` : "/",
      label: "Vérsements chéques",
      active: pathname.includes(`versement`),
      icon: Send,
    },
    {
      href: notHomePage ? `/${pathname[1]}/gestioncheques/pversement` : "/",
      label: "Pointage vérsements",
      active: pathname.includes(`pversement`),
      icon: ArchiveX,
    },

    {
      href: "#",
      label: "Trash",
      active: false,
      icon: Trash2,
    },
    {
      href: "#",
      active: false,
      label: "Archive",
      icon: Archive,
    },
  ];

  const links2 = [
    {
      label: "Social",
      icon: Users2,
      href: "#",
      active: false,
    },
    {
      label: "Updates",
      icon: AlertCircle,
      href: "#",
      active: false,
    },

    {
      label: "Forums",
      icon: MessagesSquare,
      href: "#",
      active: false,
    },

    {
      label: "Shopping",
      icon: ShoppingCart,
      href: "#",
      active: false,
    },

    {
      label: "Promotions",
      icon: Archive,
      href: "#",
      active: false,
    },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="min-h-screen   items-stretch"
      >
        <ResizablePanel
          defaultSize={20}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            "bg-white",
            isCollapsed &&
              "min-w-[50px] min-h-screen transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px]   items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <NavCombo isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={links1} />
          <Separator />
          <Nav isCollapsed={isCollapsed} links={links2} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="m-2 ">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
