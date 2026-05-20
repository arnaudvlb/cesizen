"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import AuthOnly from "../ui/AuthOnlyLink/AuthOnlyLink";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light",
      );
    };

    applyTheme(mediaQuery.matches);
    mediaQuery.addEventListener("change", (e) => applyTheme(e.matches));

    return () =>
      mediaQuery.removeEventListener("change", (e) => applyTheme(e.matches));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <img src="../logocesizen.png" alt="Logo cesizen" />
      </div>

      <nav ref={navRef} className={styles.nav}>
        <div className={styles.navContainer}>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/login">Connexion</Link>
            </li>
            <li>
              <Link href="/emotions">Emotions</Link>
            </li>
            <AuthOnly>
              <li>
                <Link href="/rapports">Rapports</Link>
              </li>
              <li>
                <Link href="/trackers">Trackers</Link>
              </li>
            </AuthOnly>
          </ul>

          <button
            className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>

        <div
          className={`${styles.mobileWrapper} ${menuOpen ? styles.open : ""}`}
        >
          <ul className={styles.mobileMenu}>
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/emotions" onClick={() => setMenuOpen(false)}>
                Emotions
              </Link>
            </li>
            <AuthOnly>
              <li>
                <Link href="/rapports" onClick={() => setMenuOpen(false)}>
                  Rapports
                </Link>
              </li>
              <li>
                <Link href="/trackers" onClick={() => setMenuOpen(false)}>
                  Trackers
                </Link>
              </li>
            </AuthOnly>
          </ul>
        </div>
      </nav>
    </header>
  );
}
