import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div>
          <div className={styles.footerLogo}>CareerAdvisor</div>
          <p className={styles.footerTagline}>
            Guiding you to the career and education path made just for you.
          </p>
        </div>

        <nav className={styles.footerLinks} aria-label="Quick links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </nav>

        <div className={styles.footerContact}>
          <a href="mailto:support@careeradvisor.com">support@careeradvisor.com</a>
          <a href="tel:+1234567890">+1 (234) 567-890</a>
        </div>

        <div className={styles.footerSocial} aria-label="Social media links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className={styles.footerCopy}>
        © {new Date().getFullYear()} CareerAdvisor. All rights reserved.
      </div>
    </footer>
  );
}
