"use client";

import { useEffect, useState } from "react";
import { AuthOnlyLinkProps } from "@/types/components/AuthOnlyLinkProps";

export default function AuthOnly({ children }: AuthOnlyLinkProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  if (!isAuth) return null;

  return <>{children}</>;
}