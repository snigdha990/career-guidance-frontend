"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    currentYear: "",
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            age: form.age
              ? Number(form.age)
              : undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong"
        );
      }

      const avatar =
        form.name.charAt(0).toUpperCase();

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data,
          avatar,
        })
      );

      alert("Account created successfully!");

      router.push("/");

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.signupcontainer}>
      <div className={styles.signupcard}>

        <h1>
          Create your Career Guidance account
        </h1>

        {error && (
          <div className={styles.errorbox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="currentYear"
            placeholder="Current Year (e.g. 3rd year)"
            value={form.currentYear}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Sign Up"}
          </button>

        </form>
      </div>
    </main>
  );
}