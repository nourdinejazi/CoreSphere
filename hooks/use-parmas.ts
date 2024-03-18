"use client";
import { useParams } from "next/navigation";

export const ParamsHook = () => {
  const params = useParams();
  return params;
};
