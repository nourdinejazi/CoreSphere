"use client";
import { useParams } from "next/navigation";

export const useParamsHook = () => {
  const params = useParams();
  return params;
};
