
import React, { useEffect, useState, useCallback } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { ArrowUp } from "lucide-react";

import "./index.css";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portofolio from "./Pages/Portofolio";
import Services from "./Pages/Services";
import ContactPage from "./Pages/Contact";
import WelcomeScreen from "./Pages/WelcomeScreen";
import NotFoundPage from "./Pages/404";

// Components
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import ProjectDetails from "./components/ProjectDetail";

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const pageVariants = {
  initial: {
    opacity: 0,
    y: 25,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.99,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

const navbarVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// ==========================================
// FOOTER
// ==========================================

function Footer() {
  return (
    <motion.footer
      className="relative z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto max-w-7xl px-5">
        <hr className="my-6 border-gray-400/15" />

        <p className="pb-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}

          <a
            href="https://www.linkedin.com/in/hamza-tlili-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Hamza Tlili
          </a>

          {" "}· Cybersecurity Engineer | SOC Analyst
        </p>
      </div>
    </motion.footer>
  );
}

// ==========================================
// ANIMATED NAVBAR
// ==========================================

function AnimatedNavbar() {
  return (
    <motion.div
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar />
    </motion.div>
  );
}

// ==========================================
// HOME / LANDING PAGE
// ==========================================

function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen
            key="welcome-screen"
            onLoadingComplete={handleWelcomeComplete}
          />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <motion.div
          key="landing-content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <AnimatedNavbar />

          <AnimatedBackground />

          <main>
            <Home />
            <About />
            <Portofolio />
            <Services />
            <ContactPage />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  );
}

// ==========================================
// PROJECT DETAILS PAGE
// ==========================================

function ProjectPageLayout() {
  return (
    <motion.div
      key="project-details"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <AnimatedNavbar />

      <AnimatedBackground />

      <ProjectDetails />

      <Footer />
    </motion.div>
  );
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        scrollableHeight > 0
          ? Math.min(
              100,
              Math.max(
                0,
                Math.round(
                  (window.scrollY / scrollableHeight) * 100
                )
              )
            )
          : 0;

      setShowButton(window.scrollY > 300);
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const circumference = 2 * Math.PI * 24;

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label={`Scroll to top, ${progress}%`}
          title={`Scroll progress: ${progress}%`}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#09051f]/90 text-white shadow-[0_8px_30px_rgba(99,102,241,0.3)] ring-1 ring-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="2"
            />

            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#scroll-progress)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference * (1 - progress / 100)
              }
              className="transition-all duration-300"
            />

            <defs>
              <linearGradient
                id="scroll-progress"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>

          <span className="relative flex flex-col items-center justify-center leading-none">
            <ArrowUp
              size={15}
              strokeWidth={2.5}
              className="mb-0.5"
            />

            <span className="text-[9px] font-semibold text-cyan-100">
              {progress}%
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// APPLICATION ROUTES
// ==========================================

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/project/:id"
            element={<ProjectPageLayout />}
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </AnimatePresence>

      <ScrollToTopButton />
    </>
  );
}

// ==========================================
// MAIN APPLICATION
// ==========================================

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
    </BrowserRouter>
  );
}
