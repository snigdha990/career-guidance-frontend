"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>Career Guidance</h2>

      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav
        className={`${styles.headerLinks} ${
          isMobileMenuOpen ? styles.showMenu : ""
        }`}
      >
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/career">Career</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/admin-panel">Admin Panel</Link>

        {user ? (
          <div className={styles.userSection}>
            <div
              className={styles.avatar}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link href="/sign-up">Sign Up</Link> |{" "}
            <Link href="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
