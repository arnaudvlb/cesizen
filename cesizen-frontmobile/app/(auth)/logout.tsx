"use client";

import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function LogOutPage() {
  const router = useRouter();
  const { syncAuth } = useAuth();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await SecureStore.deleteItemAsync("token");
      await syncAuth();
      router.push("/login");
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <FormMessage message={"Vous allez être déconnecté."} />;
}
