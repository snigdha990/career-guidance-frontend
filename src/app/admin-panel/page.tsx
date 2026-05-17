"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./admin.module.css";

interface UserData {
  _id: string;
  name: string;
  email: string;
  career: string;
}

export default function AdminPage() {
  const router = useRouter();

  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = localStorage.getItem("user");

    if (!admin) {
      router.push("/login");
      return;
    }

    const parsedAdmin = JSON.parse(admin);

    if (!parsedAdmin.isAdmin) {
      alert("Access denied! Admins only.");
      router.push("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`
        );

        const data = await res.json();

        setUsers(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  return (
    <main className={styles.adminPage}>
      <Header />

      <div className={styles.container}>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Admin Dashboard</h1>

            <p>
              Track student career interests and learning domains
            </p>
          </div>

          <div className={styles.totalCard}>
            <span>Total Students</span>

            <h2>{users.length}</h2>
          </div>
        </section>

        {loading ? (
          <div className={styles.loadingBox}>
            <h2>Loading students...</h2>
          </div>
        ) : users.length > 0 ? (
          <div className={styles.cardGrid}>
            {users.map((user) => (
              <div
                key={user._id}
                className={styles.userCard}
              >
                <div className={styles.avatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <h2>{user.name}</h2>

                <p className={styles.email}>
                  {user.email}
                </p>

                <div className={styles.bottomRow}>
                  <span className={styles.badge}>
                    {user.career}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No Students Found</h2>

            <p>
              Students who complete the quiz will appear here.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}