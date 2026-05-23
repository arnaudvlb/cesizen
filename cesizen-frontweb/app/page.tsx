"use client"

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuth } = useAuth();
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur CESIZen</h1>

      <div className="home-buttons">
        <Link href="/emotions">
          <button className="home-button">Découvrez les émotions</button>
        </Link>
        {!isAuth && (
          <Link href="/login">
            <button className="home-button">Connectez-vous</button>
          </Link>
        )}
      </div>
    </div>
  );
}
