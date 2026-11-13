
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Network,
  Terminal,
  Lock,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// ==========================================
// TYPEWRITER EFFECT
// ==========================================

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
};

// ==========================================
// BACKGROUND EFFECT
// ==========================================

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-indigo-600/20 blur-3xl animate-pulse" />

    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />

    <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />

    <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />

    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>
);

// ==========================================
// ICON BUTTON
// ==========================================

const IconButton = ({ Icon }) => (
  <div className="relative group transition-transform duration-300 hover:scale-110">
    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-30 blur group-hover:opacity-75 transition duration-300" />

    <div className="relative rounded-full border border-white/10 bg-black/50 p-3 backdrop-blur-sm sm:p-4">
      <Icon className="h-6 w-6 text-white sm:h-7 sm:w-7 md:h-8 md:w-8" />
    </div>
  </div>
);

// ==========================================
// WELCOME SCREEN
// ==========================================

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);

      // Wait for the welcome exit animation before showing the portfolio
      const completionTimer = setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);

      return () => clearTimeout(completionTimer);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Main exit animation
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Child exit animation
  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative flex min-h-screen items-center justify-center px-4">
            <div className="mx-auto w-full max-w-4xl">

              {/* Cybersecurity Icons */}

              <motion.div
                className="mb-8 flex justify-center gap-4 sm:gap-6 md:gap-8"
                variants={childVariants}
              >
                {[ShieldCheck, Network, Terminal].map(
                  (Icon, index) => (
                    <motion.div
                      key={index}
                      data-aos="fade-down"
                      data-aos-delay={index * 200}
                    >
                      <IconButton Icon={Icon} />
                    </motion.div>
                  )
                )}
              </motion.div>

              {/* Welcome Text */}

              <motion.div
                className="mb-8 text-center sm:mb-10 md:mb-12"
                variants={childVariants}
              >
                <h1 className="space-y-3 text-3xl font-bold sm:text-4xl md:text-6xl">

                  <div className="mb-3">
                    <span
                      data-aos="fade-right"
                      data-aos-delay="200"
                      className="inline-block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text px-2 text-transparent"
                    >
                      Welcome
                    </span>

                    <span
                      data-aos="fade-right"
                      data-aos-delay="400"
                      className="inline-block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text px-2 text-transparent"
                    >
                      To
                    </span>
                  </div>

                  <div>
                    <span
                      data-aos="fade-up"
                      data-aos-delay="600"
                      className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text px-2 text-transparent"
                    >
                      Hamza Tlili
                    </span>
                  </div>

                  <div className="pt-2">
                    <span
                      data-aos="fade-up"
                      data-aos-delay="800"
                      className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text px-2 text-transparent"
                    >
                      Cybersecurity Portfolio
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Professional Title */}

              <motion.div
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-400 sm:text-base">
                  <Lock size={16} className="text-cyan-400" />

                  <span>
                    <TypewriterEffect text="Cybersecurity Engineer | SOC Analyst | DevSecOps" />
                  </span>
                </div>

                {/* Loading Progress */}

                <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                    }}
                  />
                </div>

                <p className="mt-4 text-xs tracking-[0.25em] text-gray-500">
                  INITIALIZING SECURE ENVIRONMENT
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
