"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Login failed"
        );
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      if (data.isAdmin) {
        router.push("/admin-panel");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>

        <div className={styles.topSection}>
          <h1>Welcome Back</h1>

          <p>
            Login to continue your career
            guidance journey
          </p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          <div className={styles.inputGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className={styles.bottomText}>
          Don&apos;t have an account?{" "}

          <Link href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}