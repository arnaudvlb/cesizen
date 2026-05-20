"use client";

import { useEffect, useState } from "react";
import { AuthOnlyLinkProps } from "@/types/components/ui/AuthOnlyLinkProps";

export default function AuthOnly({ children }: AuthOnlyLinkProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  if (!isAuth) return null;

  return <>{children}</>;
}