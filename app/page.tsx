"use client";
import { CommandSearch } from "@/components/command-search";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <CommandSearch forceOpen onForceOpenChange={() => false} />
    </div>
  );
}
