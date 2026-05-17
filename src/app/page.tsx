"use client"
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SparkleWrapper from "./components/SparkleWrapper";
import VantaFog from './components/VantaFog';
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
interface AnimatedWordsOnScrollProps {
  children: string;
  className?: string;
}

function AnimatedWordsOnScroll({ children, className }: AnimatedWordsOnScrollProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <p ref={ref} className={className} style={{ overflow: "hidden" }}>
      {words.map((word: string, i: number) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.15s ease ${i * 0.05}s, transform 0.15s ease ${i * 0.05}s`,
            marginRight: "0.25em",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <VantaFog />
      <Header />
      <div className="mainpage">
        <section id="mainpage-content" className="mainpage-content">
          <SparkleWrapper />
          <h1 className="gradient-heading">
            <span className="gradient-main">One-Stop Personalized</span>{" "}
            <span className="gradient-sub">Career & Education Advisor</span>
            <br />
            <span className="underline-highlight">Tailored just for you</span>
          </h1>
          <h2>
            A comprehensive guide to tailored career and educational pathways — designed just for you.
          </h2>
          <AnimatedWordsOnScroll className="text-lg max-w-3xl mx-auto font-light text-indigo-700">
            Unlock your potential and confidently embrace a future designed for you.
          </AnimatedWordsOnScroll>
        </section>

        <section id="personalized-guidance" className="section-container">
          <div className="text-content">
            <h2>Empower Your Future with Personalized Guidance</h2>
            <AnimatedWordsOnScroll className="text-lg max-w-3xl mx-auto font-light text-gray-600">
              Empower your future with personalized career and education guidance. Explore tailored
              pathways, develop essential skills, and make informed decisions aligned with your unique
              goals. Whether launching your career or seeking advancement, we provide expert support to
              help you succeed.
            </AnimatedWordsOnScroll>
          </div>
          <div className="image-container">
            <Image
              src="/images/generated-image.png"
              alt="Career guidance illustration"
              width={900}
              height={720}
              className="responsive-image"
            />
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="features-container">
            <h2 className="features-title">Platform Features</h2>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Personalized Recommendations</h3>
                <p className="feature-description">
                  Get career and education suggestions tailored to your goals, strengths, and interests.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3 className="feature-title">Skill Development Pathways</h3>
                <p className="feature-description">
                  Follow structured learning paths to develop in-demand skills aligned with your career direction.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Progress Tracking</h3>
                <p className="feature-description">
                  Monitor your learning and career journey with real-time progress tracking and insights.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3 className="feature-title">AI Advisor</h3>
                <p className="feature-description">
                  Ask questions and get instant guidance from our smart advisor for any career or learning need.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works-section">
          <div className="how-it-works-container">
            <h2 className="how-it-works-title">How It Works</h2>

            <div className="how-it-works-steps">
              <div className="how-it-works-card">
                <div className="how-it-works-icon">1️⃣</div>
                <h3 className="how-it-works-step-title">Tell Us About Yourself</h3>
                <p className="how-it-works-text">
                  Answer a few simple questions about your goals, interests, and background to personalize your journey.
                </p>
              </div>

              <div className="how-it-works-card">
                <div className="how-it-works-icon">2️⃣</div>
                <h3 className="how-it-works-step-title">Get Tailored Recommendations</h3>
                <p className="how-it-works-text">
                  Receive career and education pathways that align with your unique profile and aspirations.
                </p>
              </div>

              <div className="how-it-works-card">
                <div className="how-it-works-icon">3️⃣</div>
                <h3 className="how-it-works-step-title">Take Action</h3>
                <p className="how-it-works-text">
                  Explore learning resources, build skills, and track your progress as you work towards your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="start-now" className="cta-section">
          <div className="cta-container">
            <h2 className="cta-heading">Ready to Start Your Journey?</h2>
            <p className="cta-subheading">Get personalized career and learning recommendations in minutes.</p>
            <Link href="/quiz" className="cta-button">Start Now</Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
