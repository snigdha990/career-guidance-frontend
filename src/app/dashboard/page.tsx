"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./dashboard.module.css";

interface Recommendation {
  title: string;
  description: string;
}

const domainData: Record<
  string,
  {
    recommendations: Recommendation[];
    nextSteps: string[];
  }
> = {
  "Web Developer": {
    recommendations: [
      {
        title: "Learn React",
        description: "Build modern UI applications using React.",
      },
      {
        title: "Master Next.js",
        description: "Learn server-side rendering and routing.",
      },
      {
        title: "Responsive Design",
        description: "Create mobile-friendly websites.",
      },
    ],
    nextSteps: [
      "Build a portfolio website",
      "Learn API integration",
      "Practice frontend projects",
    ],
  },

  "Data Scientist": {
    recommendations: [
      {
        title: "Python for Data Science",
        description: "Learn NumPy, Pandas, and Matplotlib.",
      },
      {
        title: "Machine Learning Basics",
        description: "Understand ML algorithms and models.",
      },
      {
        title: "SQL for Data Analysis",
        description: "Query and manage datasets effectively.",
      },
    ],
    nextSteps: [
      "Complete ML mini project",
      "Learn data visualization",
      "Practice Kaggle datasets",
    ],
  },

  "Mobile App Developer": {
    recommendations: [
      {
        title: "Learn React Native",
        description: "Build cross-platform mobile apps.",
      },
      {
        title: "Flutter Basics",
        description: "Create beautiful mobile UIs.",
      },
      {
        title: "Firebase Integration",
        description: "Add authentication and database support.",
      },
    ],
    nextSteps: [
      "Develop a simple mobile app",
      "Learn app deployment",
      "Explore push notifications",
    ],
  },

  "Cloud Engineer": {
    recommendations: [
      {
        title: "AWS Cloud Basics",
        description:
          "Learn cloud computing concepts and AWS services.",
      },
      {
        title: "Docker & Containers",
        description:
          "Understand containerization and deployment workflows.",
      },
      {
        title: "Kubernetes Fundamentals",
        description:
          "Manage scalable cloud-native applications.",
      },
    ],

    nextSteps: [
      "Build a cloud deployment project",
      "Learn CI/CD pipelines",
      "Practice Docker & Kubernetes",
    ],
  },

  "General Career": {
    recommendations: [
      {
        title: "Communication Skills",
        description: "Improve professional communication.",
      },
      {
        title: "Time Management",
        description: "Manage tasks effectively.",
      },
    ],

    nextSteps: [
      "Update your profile",
      "Set learning goals",
      "Explore career paths",
    ],
  },
};

export default function Dashboard() {
  const [userName, setUserName] =
    useState("User");

  const [career, setCareer] =
    useState("General Career");

  const [recommendations, setRecommendations] =
    useState<Recommendation[]>([]);

  const [nextSteps, setNextSteps] =
    useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser =
          localStorage.getItem("user");

        if (!storedUser) return;

        const user = JSON.parse(storedUser);

        setUserName(user.name);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-result/${user._id}`
        );

        const data = await res.json();

        if (data?.career) {
          setCareer(data.career);

          const selectedDomain =
            domainData[data.career] ||
            domainData["General Career"];

          setRecommendations(
            selectedDomain.recommendations
          );

          setNextSteps(
            selectedDomain.nextSteps
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <main className={styles.dashboardPage}>
      <Header />

      <div className={styles.dashboardContent}>
        <section className={styles.heroCard}>
          <div>
            <h1>
              Welcome back, {userName} 👋
            </h1>

            <p>
              Your personalized learning dashboard
              for <strong>{career}</strong>
            </p>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            Recommended Learning Paths
          </h2>

          <div
            className={styles.recommendationsGrid}
          >
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={
                  styles.recommendationCard
                }
              >
                <h3>{rec.title}</h3>

                <p>{rec.description}</p>

                <button
                  className={styles.startBtn}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </section>

        <section
          className={styles.progressSection}
        >
          <h2 className={styles.sectionTitle}>
            Your Progress
          </h2>

          <div className={styles.progressCard}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
              ></div>
            </div>

            <p>
              Keep learning consistently to
              improve your skills 🚀
            </p>
          </div>
        </section>

        <section
          className={styles.nextStepsSection}
        >
          <h2 className={styles.sectionTitle}>
            Next Steps
          </h2>

          <div className={styles.stepsGrid}>
            {nextSteps.map((step, idx) => (
              <div
                key={idx}
                className={styles.stepCard}
              >
                <span>{idx + 1}</span>

                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}