
import React, { memo, useEffect } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Network,
  Cloud,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

// About section header
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      About Me
    </h2>

    <p
      className="mt-3 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <ShieldCheck className="w-5 h-5 text-cyan-400" />
      Securing systems. Building reliable infrastructures.
      <ShieldCheck className="w-5 h-5 text-cyan-400" />
    </p>
  </div>
));

// Profile image
const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center sm:p-12 sm:py-0 p-0 py-4">
    <div
      className="relative group"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute -inset-6 opacity-25 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500 via-cyan-400 to-teal-400 rounded-full blur-2xl animate-pulse-slow opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-cyan-400/20 shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-700 group-hover:scale-105">
          <img
            src="/public/Hamza.jpeg"
            alt="Hamza Tlili - Cybersecurity Engineer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="absolute -bottom-3 -right-3 bg-gray-900 border border-cyan-400/30 rounded-2xl p-4 shadow-xl">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
    </div>
  </div>
));

// Statistics card
const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration="1000"
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        />

        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10">
            <Icon className="w-7 h-7 text-cyan-400" />
          </div>

          <span className="text-4xl font-bold text-white">
            {value}
          </span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-gray-300 mb-2">
            {label}
          </p>

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              {description}
            </p>

            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-cyan-400 transition-colors shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
);

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 900,
      offset: 80,
    });

    AOS.refresh();
  }, []);

  const statsData = [
    {
      icon: Code,
      color: "from-cyan-500 to-blue-600",
      value: "5+",
      label: "Projects",
      description: "Cybersecurity and software projects",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-blue-500 to-indigo-600",
      value: "16+",
      label: "Certifications",
      description: "Technical learning and professional development",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-cyan-500 to-teal-600",
      value: "2+",
      label: "Internships",
      description: "Practical and professional experience",
      animation: "fade-left",
    },
  ];

  return (
    <section
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Personal Introduction */}
          <div className="space-y-6 text-center lg:text-left">

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Hello, I'm
              </span>

              <span className="block mt-2 text-gray-200">
                Hamza Tlili
              </span>
            </h2>

            <div
              className="text-cyan-400 font-semibold text-lg"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              Computer Engineer | Networks & Security
            </div>

            <p
              className="text-base sm:text-lg text-gray-400 leading-relaxed text-justify pb-4"
              data-aos="fade-right"
              data-aos-duration="1400"
            >
              I am a Computer Engineer specialized in Networks and
              Information Systems, graduated with High Honors from ISIK
              (2023–2026).

              <br />
              <br />

              My main interests include cybersecurity, Security Operations
              Center (SOC), network security, cloud security, and DevSecOps.
              I enjoy designing secure infrastructures, monitoring threats,
              analyzing security events, and automating technical processes.

              <br />
              <br />

              Through academic projects, practical labs, internships, and
              professional certifications, I have developed hands-on
              experience with technologies such as Wazuh, Suricata, Linux,
              Python, Docker, AWS, and network security tools.

              <br />
              <br />

              I am currently looking for opportunities as a Junior SOC
              Analyst, Cybersecurity Engineer, Network Security Engineer,
              or DevSecOps Engineer, while continuing to develop my
              technical expertise.
            </p>

            {/* Specializations */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div className="flex items-center justify-center gap-2 bg-white/5 border border-cyan-500/20 rounded-xl p-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-300">Cybersecurity</span>
              </div>

              <div className="flex items-center justify-center gap-2 bg-white/5 border border-cyan-500/20 rounded-xl p-3">
                <Network className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-300">Networking</span>
              </div>

              <div className="flex items-center justify-center gap-2 bg-white/5 border border-cyan-500/20 rounded-xl p-3">
                <Cloud className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-300">Cloud & DevOps</span>
              </div>
            </div>

            {/* Quote */}
            <div
              className="relative bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 border border-cyan-500/20 rounded-2xl p-5 my-6 backdrop-blur-md"
              data-aos="fade-up"
              data-aos-duration="1600"
            >
              <p className="text-gray-300 italic leading-relaxed">
                "Security is not a product, but a continuous process of
                learning, improving, and protecting."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">

              <a
                href="/Hamza-Tlili-CV.pdf"
                download="Hamza-Tlili-CV.pdf"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/20"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <FileText className="w-5 h-5" />
                Download CV
              </a>

              <a
                href="#Portofolio"
                className="w-full sm:w-auto px-6 py-3 rounded-lg border border-cyan-400/50 text-cyan-400 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-cyan-400/10"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Code className="w-5 h-5" />
                View Projects
              </a>

            </div>
          </div>

          {/* Profile Image */}
          <ProfileImage />

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);
