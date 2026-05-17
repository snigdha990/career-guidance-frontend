"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/data/quizQuestions";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./quiz.module.css";

export default function QuizPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [loading, setLoading] =
    useState(false);

  const [checkingQuiz, setCheckingQuiz] =
    useState(true);

  useEffect(() => {
    const checkQuizStatus = async () => {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        alert("Please login first");

        router.push("/login");

        return;
      }

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-result/${user._id}`
        );

        if (res.ok) {
          alert(
            "You have already completed the quiz"
          );

          router.push("/dashboard");

          return;
        }

      } catch (error) {
        console.log(error);

      } finally {
        setCheckingQuiz(false);
      }
    };

    checkQuizStatus();

  }, [router]);

  const total = quizQuestions.length;

  const question = quizQuestions[current];

  const handleSelect = async (
    option: string
  ) => {
    if (loading) return;

    const updatedAnswers = {
      ...answers,
      [question.id]: option,
    };

    setAnswers(updatedAnswers);

    if (current + 1 < total) {

      setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 300);

    } else {

      await submitQuiz(updatedAnswers);

    }
  };

  const submitQuiz = async (
    finalAnswers: Record<number, string>
  ) => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      alert("Please login first");

      router.push("/login");

      return;
    }

    const user = JSON.parse(storedUser);

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-result`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            userId: user._id,
            answers: finalAnswers,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(
          data.error ||
            "Failed to submit quiz"
        );

        return;
      }

      alert(
        "Quiz submitted successfully"
      );

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong while submitting the quiz."
      );

    } finally {

      setLoading(false);

    }
  };

  if (checkingQuiz) {
    return (
      <div className={styles.loadingScreen}>
        Checking quiz status...
      </div>
    );
  }

  return (
    <div className={styles["quiz-page"]}>
      <Header />

      <div className={styles["quiz-container"]}>

        <div className={styles["progress-section"]}>

          <div className={styles["progress-text"]}>

            <span>
              Question {current + 1}
            </span>

            <span>
              {Math.round(
                ((current + 1) / total) * 100
              )}
              %
            </span>

          </div>

          <div className={styles["progress-bar"]}>

            <motion.div
              className={styles["progress-fill"]}
              animate={{
                width: `${
                  ((current + 1) / total) * 100
                }%`,
              }}
              transition={{
                duration: 0.3,
              }}
            />

          </div>

        </div>

        <AnimatePresence mode="wait">

          <motion.div
            key={question.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.3,
            }}
            className={
              styles["question-block"]
            }
          >

            <h2
              className={
                styles["question-title"]
              }
            >
              {question.question}
            </h2>

            <p
              className={
                styles["question-category"]
              }
            >
              {question.category}
            </p>

          </motion.div>

        </AnimatePresence>

        <div className={styles["options-grid"]}>

          {question.options.map((option) => (

            <motion.button
              key={option}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                handleSelect(option)
              }
              className={
                styles["option-button"]
              }
              disabled={loading}
            >
              {option}
            </motion.button>

          ))}

        </div>

        {loading && (

          <p className={styles["loading-text"]}>
            Submitting your quiz...
          </p>

        )}

      </div>

      <Footer />
    </div>
  );
}