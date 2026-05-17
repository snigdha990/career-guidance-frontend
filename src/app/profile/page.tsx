"use client";

import { useEffect, useState } from "react";
import styles from "./profile.module.css";

interface User {
  name: string;
  age: number;
  email: string;
  currentYear: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatar}>{firstLetter}</div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Year: {user.currentYear}</p>
    </div>
  );
}
