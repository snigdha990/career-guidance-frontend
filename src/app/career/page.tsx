"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./career.module.css";

interface Skill {
  name: string;
  level: number;
}

interface Course {
  title: string;
  platform: string;
  duration: string;
  level: string;
}

interface CareerData {
  icon: string;
  description: string;
  salary: string;
  growth: string;
  demand: string;
  match: string;
  skills: Skill[];
  roadmap: string[];
  technologies: string[];
  courses: Course[];
}

export default function CareerPage() {
  const [career, setCareer] = useState("Web Developer");

  const careerData: Record<string, CareerData> = {
    "Web Developer": {
      icon: "💻",

      description:
        "Design and build modern responsive websites and scalable full stack applications using powerful frontend and backend technologies.",

      salary: "8 - 18 LPA",
      growth: "Very High",
      demand: "High",
      match: "92%",

      skills: [
        { name: "HTML & CSS", level: 90 },
        { name: "JavaScript", level: 84 },
        { name: "React.js", level: 80 },
        { name: "Node.js", level: 72 },
      ],

      roadmap: [
        "Learn HTML, CSS & JavaScript",
        "Master React & Next.js",
        "Build Full Stack Projects",
        "Learn APIs & Databases",
        "Deploy Real Applications",
      ],

      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "MongoDB",
        "Express",
        "Tailwind CSS",
        "Git",
        "Docker",
      ],

      courses: [
        {
          title: "React Complete Guide",
          platform: "Udemy",
          duration: "32 hrs",
          level: "Intermediate",
        },
        {
          title: "Next.js Masterclass",
          platform: "Coursera",
          duration: "18 hrs",
          level: "Advanced",
        },
        {
          title: "Full Stack Bootcamp",
          platform: "YouTube",
          duration: "40 hrs",
          level: "Beginner",
        },
      ],
    },

    "Data Scientist": {
      icon: "📊",

      description:
        "Analyze complex datasets, build intelligent prediction models, and create data-driven business solutions.",

      salary: "10 - 22 LPA",
      growth: "Extremely High",
      demand: "Very High",
      match: "89%",

      skills: [
        { name: "Python", level: 88 },
        { name: "SQL", level: 82 },
        { name: "Machine Learning", level: 76 },
        { name: "Data Visualization", level: 72 },
      ],

      roadmap: [
        "Learn Python Fundamentals",
        "Master Data Analysis",
        "Study Machine Learning",
        "Work on Real Datasets",
        "Build AI & Analytics Projects",
      ],

      technologies: [
        "Python",
        "Pandas",
        "NumPy",
        "Scikit-Learn",
        "TensorFlow",
        "Power BI",
        "SQL",
      ],

      courses: [
        {
          title: "Python for Data Science",
          platform: "Coursera",
          duration: "24 hrs",
          level: "Beginner",
        },
        {
          title: "Machine Learning A-Z",
          platform: "Udemy",
          duration: "36 hrs",
          level: "Advanced",
        },
        {
          title: "Data Analytics Bootcamp",
          platform: "YouTube",
          duration: "20 hrs",
          level: "Intermediate",
        },
      ],
    },

    "AI Engineer": {
      icon: "🤖",

      description:
        "Develop intelligent AI systems using machine learning, deep learning, NLP, and generative AI technologies.",

      salary: "15 - 30 LPA",
      growth: "Explosive",
      demand: "Very High",
      match: "91%",

      skills: [
        { name: "Python", level: 92 },
        { name: "Deep Learning", level: 80 },
        { name: "NLP", level: 74 },
        { name: "TensorFlow", level: 78 },
      ],

      roadmap: [
        "Master Python Programming",
        "Learn Machine Learning",
        "Study Deep Learning",
        "Build AI Models",
        "Work on Generative AI Projects",
      ],

      technologies: [
        "TensorFlow",
        "PyTorch",
        "LangChain",
        "OpenAI APIs",
        "Hugging Face",
        "Docker",
      ],

      courses: [
        {
          title: "Deep Learning Specialization",
          platform: "Coursera",
          duration: "42 hrs",
          level: "Advanced",
        },
        {
          title: "Generative AI Bootcamp",
          platform: "Udemy",
          duration: "26 hrs",
          level: "Intermediate",
        },
        {
          title: "AI Engineering Masterclass",
          platform: "YouTube",
          duration: "30 hrs",
          level: "Advanced",
        },
      ],
    },

    "Cloud Engineer": {
      icon: "☁️",

      description:
        "Design, deploy, and manage scalable cloud infrastructure and services using modern cloud platforms and DevOps practices.",

      salary: "10 - 22 LPA",
      growth: "Very High",
      demand: "Extremely High",
      match: "90%",

      skills: [
        { name: "AWS", level: 84 },
        { name: "Docker", level: 76 },
        { name: "Kubernetes", level: 72 },
        { name: "Linux", level: 80 },
      ],

      roadmap: [
        "Learn Linux Fundamentals",
        "Master Cloud Basics",
        "Learn AWS or Azure",
        "Study Docker & Kubernetes",
        "Build Cloud Deployment Projects",
      ],

      technologies: [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Jenkins",
        "Linux",
        "GitHub Actions",
      ],

      courses: [
        {
          title: "AWS Cloud Practitioner",
          platform: "Coursera",
          duration: "20 hrs",
          level: "Beginner",
        },
        {
          title: "Docker & Kubernetes Bootcamp",
          platform: "Udemy",
          duration: "28 hrs",
          level: "Intermediate",
        },
        {
          title: "DevOps Full Course",
          platform: "YouTube",
          duration: "24 hrs",
          level: "Advanced",
        },
      ],
    },
    
    "Mobile App Developer": {
      icon: "📱",

      description:
        "Build modern Android and iOS applications with smooth UI experiences and scalable backend integrations.",

      salary: "8 - 17 LPA",
      growth: "High",
      demand: "High",
      match: "87%",

      skills: [
        { name: "React Native", level: 80 },
        { name: "Flutter", level: 74 },
        { name: "Firebase", level: 72 },
        { name: "UI Design", level: 76 },
      ],

      roadmap: [
        "Learn Mobile UI Basics",
        "Master React Native or Flutter",
        "Integrate Firebase",
        "Build Real Apps",
        "Deploy to Play Store",
      ],

      technologies: [
        "React Native",
        "Flutter",
        "Firebase",
        "Android Studio",
        "Expo",
        "Figma",
      ],

      courses: [
        {
          title: "React Native Complete Guide",
          platform: "Udemy",
          duration: "30 hrs",
          level: "Intermediate",
        },
        {
          title: "Flutter Development Bootcamp",
          platform: "Coursera",
          duration: "20 hrs",
          level: "Beginner",
        },
        {
          title: "Firebase for Mobile Apps",
          platform: "YouTube",
          duration: "12 hrs",
          level: "Intermediate",
        },
      ],
    },
  };

  useEffect(() => {
    const fetchCareer = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/quiz-result/${user._id}`
        );

        const data = await res.json();

        if (data?.career) {
          setCareer(data.career);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCareer();
  }, []);

  const selectedCareer =
    careerData[career] || careerData["Web Developer"];

  return (
    <main className={styles.careerPage}>
      <Header />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <span className={styles.heroIcon}>
              {selectedCareer.icon}
            </span>

            <div>
              <h1>{career}</h1>

              <p>{selectedCareer.description}</p>
            </div>
          </div>

          <div className={styles.matchCard}>
            <span>Career Match</span>

            <h2>{selectedCareer.match}</h2>

            <p>Excellent fit for your interests</p>
          </div>
        </section>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>💰 Average Salary</h3>
            <p>{selectedCareer.salary}</p>
          </div>

          <div className={styles.statCard}>
            <h3>📈 Growth Rate</h3>
            <p>{selectedCareer.growth}</p>
          </div>

          <div className={styles.statCard}>
            <h3>🔥 Industry Demand</h3>
            <p>{selectedCareer.demand}</p>
          </div>

          <div className={styles.statCard}>
            <h3>🚀 Opportunities</h3>
            <p>Excellent</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Skill Gap Analysis</h2>
            <p>Your current learning progress</p>
          </div>

          <div className={styles.skillsGrid}>
            {selectedCareer.skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div className={styles.skillTop}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>

                <div className={styles.skillBar}>
                  <div
                    className={styles.skillFill}
                    style={{
                      width: `${skill.level}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Learning Roadmap</h2>
            <p>Step-by-step career growth path</p>
          </div>

          <div className={styles.roadmapGrid}>
            {selectedCareer.roadmap.map((step, index) => (
              <div key={index} className={styles.roadmapCard}>
                <div className={styles.stepNumber}>
                  {index + 1}
                </div>

                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recommended Courses</h2>
            <p>Top learning resources for your career</p>
          </div>

          <div className={styles.courseGrid}>
            {selectedCareer.courses.map((course, index) => (
              <div key={index} className={styles.courseCard}>
                <div className={styles.courseTop}>
                  <span>{course.platform}</span>

                  <small>{course.level}</small>
                </div>

                <h3>{course.title}</h3>

                <p>{course.duration}</p>

                <button>
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Technologies to Learn</h2>
            <p>Trending tools & frameworks</p>
          </div>

          <div className={styles.techContainer}>
            {selectedCareer.technologies.map((tech, index) => (
              <span key={index} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}