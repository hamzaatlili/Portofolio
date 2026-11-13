
import React, {
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";

import {
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Download,
  ShieldCheck,
  LockKeyhole,
  Network,
  Server,
  ScanEye,
  Terminal,
  Activity,
  ShieldAlert,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

// ==========================================
// TYPING ANIMATION CONFIGURATION
// ==========================================

const TYPING_SPEED = 90;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 1800;

const WORDS = [
  "SOC & SIEM Monitoring",
  "Network Security",
  "Cloud Security",
  "DevSecOps & Automation",
  "Threat Detection & Response",
];

// ==========================================
// SOCIAL LINKS
// ==========================================

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/hamza-tlili-",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    link: "mailto:tlilihamza725@gmail.com",
    label: "Email",
  },
];

// ==========================================
// STATUS BADGE
// ==========================================

const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000" />

      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-cyan-400" />
          Open to Opportunities
        </span>
      </div>
    </div>
  </div>
));

// ==========================================
// MAIN TITLE
// ==========================================

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 blur-2xl opacity-20" />

        <span className="relative bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
          Hamza Tlili
        </span>
      </span>

      <br />

      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 blur-2xl opacity-20" />

        <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Cybersecurity
        </span>
      </span>

      <br />

      <span className="relative inline-block mt-2">
        <span className="relative bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Engineer
        </span>
      </span>
    </h1>
  </div>
));

// ==========================================
// TYPING TEXT
// ==========================================

const TypingText = memo(({ text }) => (
  <div className="h-8 flex items-center">
    <span className="text-lg md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
      {text}
    </span>

    <span className="w-[3px] h-6 bg-gradient-to-t from-cyan-400 to-blue-500 ml-1 animate-blink" />
  </div>
));

// ==========================================
// CTA BUTTON
// ==========================================

const CTAButton = memo(({ href, text, icon: Icon, download }) => (
  <a
    href={href}
    download={download || undefined}
    className="group relative inline-flex w-[160px] h-11 items-center justify-center rounded-lg bg-[#030014] border border-white/10 overflow-hidden"
  >
    <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-30 blur-md group-hover:opacity-80 transition-all duration-700" />

    <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-cyan-500/20 to-blue-500/20" />

    <span className="relative flex items-center justify-center gap-2 text-sm text-gray-200 font-medium">
      {text}

      <Icon
        className={`w-4 h-4 transition-all duration-300 ${
          text === "Contact"
            ? "group-hover:translate-x-1"
            : "group-hover:-translate-y-0.5"
        }`}
      />
    </span>
  </a>
));

// ==========================================
// SOCIAL LINK
// ==========================================

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a
    href={link}
    aria-label={label}
    target={link.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="group relative p-3 inline-flex"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />

    <span className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/40 transition-all duration-300">
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
    </span>
  </a>
));

// ==========================================
// CYBERSECURITY VISUAL
// ==========================================

const CyberSecurityVisual = memo(({ isHovering }) => (
  <div
    className={`relative lg:left-12 z-10 w-full max-w-[520px] mx-auto transition-transform duration-500 ${
      isHovering ? "scale-105" : "scale-100"
    }`}
  >
    <div className="relative aspect-square flex items-center justify-center">

      {/* Outer rings */}

      <div className="absolute inset-[5%] rounded-full border border-cyan-500/20 animate-[spin_30s_linear_infinite]" />

      <div className="absolute inset-[13%] rounded-full border border-dashed border-blue-400/20 animate-[spin_40s_linear_infinite_reverse]" />

      <div className="absolute inset-[22%] rounded-full border border-cyan-400/20" />

      {/* Background glow */}

      <div
        className={`absolute inset-[20%] rounded-full bg-cyan-500/10 blur-[70px] transition-all duration-700 ${
          isHovering ? "scale-125 opacity-100" : "scale-100 opacity-60"
        }`}
      />

      {/* Central shield */}

      <div className="relative z-10 flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-[2.5rem] border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/30 shadow-[0_0_70px_rgba(34,211,238,0.2)] backdrop-blur-xl transition-transform duration-500">
        <ShieldCheck
          className="h-24 w-24 sm:h-28 sm:w-28 text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          strokeWidth={1.3}
        />

        <span className="absolute -bottom-3 rounded-full border border-cyan-400/30 bg-[#030014] px-4 py-1 text-xs font-semibold tracking-widest text-cyan-300">
          PROTECTED
        </span>
      </div>

      {/* Encryption card */}

      <div className="absolute top-[12%] right-[5%] z-20 animate-float rounded-2xl border border-cyan-400/20 bg-slate-900/90 p-3 sm:p-4 shadow-xl backdrop-blur-xl">
        <LockKeyhole className="h-7 w-7 sm:h-8 sm:w-8 text-cyan-400" />

        <p className="mt-2 text-[10px] text-gray-400">
          ENCRYPTION
        </p>

        <p className="text-xs font-bold text-green-400">
          ACTIVE
        </p>
      </div>

      {/* Network card */}

      <div className="absolute bottom-[19%] left-[2%] z-20 animate-float rounded-2xl border border-blue-400/20 bg-slate-900/90 p-3 sm:p-4 shadow-xl backdrop-blur-xl [animation-delay:700ms]">
        <Network className="h-7 w-7 sm:h-8 sm:w-8 text-blue-400" />

        <p className="mt-2 text-[10px] text-gray-400">
          NETWORK
        </p>

        <p className="text-xs font-bold text-cyan-400">
          SECURE
        </p>
      </div>

      {/* Threat detection */}

      <div className="absolute top-[40%] right-[-2%] z-20 animate-float rounded-2xl border border-indigo-400/20 bg-slate-900/90 p-3 shadow-xl backdrop-blur-xl [animation-delay:1200ms]">
        <ScanEye className="h-7 w-7 text-indigo-400" />
      </div>

      {/* Server */}

      <div className="absolute bottom-[15%] right-[10%] z-20 animate-float rounded-2xl border border-cyan-400/20 bg-slate-900/90 p-3 shadow-xl backdrop-blur-xl [animation-delay:400ms]">
        <Server className="h-7 w-7 text-cyan-400" />
      </div>

      {/* Security monitoring terminal */}

      <div className="absolute bottom-[2%] left-1/2 z-20 w-[70%] -translate-x-1/2 rounded-xl border border-cyan-500/20 bg-[#080d20]/95 p-3 shadow-2xl backdrop-blur-xl">
        <div className="mb-2 flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-400" />

          <span className="text-[10px] tracking-wider text-gray-400">
            SECURITY MONITOR
          </span>

          <span className="ml-auto h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        <p className="font-mono text-[9px] sm:text-[10px] text-green-400">
          {">"} Firewall initialized...
        </p>

        <p className="font-mono text-[9px] sm:text-[10px] text-cyan-400">
          {">"} Threat detection active
        </p>

        <p className="font-mono text-[9px] sm:text-[10px] text-gray-400">
          {">"} System status: Secure
        </p>
      </div>

      {/* Activity indicator */}

      <div className="absolute top-[8%] left-[12%] z-20 rounded-xl border border-green-400/20 bg-slate-900/90 p-3 backdrop-blur-xl">
        <Activity className="h-6 w-6 text-green-400 animate-pulse" />
      </div>

      <div className="absolute top-[65%] right-[2%] z-20 rounded-xl border border-red-400/20 bg-slate-900/90 p-3 backdrop-blur-xl">
        <ShieldAlert className="h-6 w-6 text-red-400" />
      </div>

    </div>
  </div>
));

// ==========================================
// MAIN HOME COMPONENT
// ==========================================

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Initialize AOS

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
      duration: 1000,
    });

    const handleResize = () => AOS.refresh();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Page loading animation

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typing animation

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_DURATION);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((previous) => (previous + 1) % WORDS.length);
      }, ERASING_SPEED);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.slice(0, text.length - 1)
              : currentWord.slice(0, text.length + 1)
          );
        },
        isDeleting ? ERASING_SPEED : TYPING_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  // Hover handlers

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // ========================================
  // RENDER
  // ========================================

  return (
    <div
      className="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
      id="Home"
    >
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto min-h-screen">

          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen lg:justify-between gap-8 lg:gap-20">

            {/* LEFT COLUMN */}

            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left order-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">

                <StatusBadge />

                <MainTitle />

                {/* Typing effect */}

                <div data-aos="fade-up" data-aos-delay="800">
                  <TypingText text={text} />
                </div>

                {/* Description */}

                <p
                  className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Computer Engineer in Networks & Security. I build
                  secure, automated and reliable infrastructures
                  through cybersecurity, SOC operations, network
                  security, cloud and DevSecOps.
                </p>

                {/* Technical highlights */}

                <div
                  className="flex flex-wrap gap-2 pt-1"
                  data-aos="fade-up"
                  data-aos-delay="1100"
                >
                  {[
                    "Wazuh",
                    "Suricata",
                    "Python",
                    "Docker",
                    "AWS",
                    "Linux",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}

                <div
                  className="flex flex-wrap gap-3 w-full justify-start pt-2"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />

                  <CTAButton
                    href="#Contact"
                    text="Contact"
                    icon={Mail}
                  />

                  <CTAButton
                    href="/Hamza-Tlili-CV.pdf"
                    text="Download CV"
                    icon={Download}
                    download="Hamza-Tlili-CV.pdf"
                  />
                </div>

                {/* Social Links */}

                <div
                  className="flex gap-4 justify-start pt-2"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social) => (
                    <SocialLink
                      key={social.label}
                      {...social}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN - CYBERSECURITY VISUAL */}

            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 mt-4 lg:mt-0"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full opacity-90">

                {/* Main background glow */}

                <div
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering
                      ? "opacity-50 scale-105"
                      : "opacity-20 scale-100"
                  }`}
                />

                {/* Cybersecurity illustration */}

                <CyberSecurityVisual isHovering={isHovering} />

                {/* Additional glow */}

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
