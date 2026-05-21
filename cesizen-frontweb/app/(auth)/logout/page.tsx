"use client";

import FormMessage from "@/components/ui/FormMessage/FormMessage";
import { useRouter } from "next/navigation";

export default function LogOutPage() {
  const router = useRouter();

  setTimeout(() => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    router.push("/login");
  }, 1500);

  return(
    <FormMessage message={"Vous allez être déconnecté."} />
  )
}

