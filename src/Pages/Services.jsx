
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";

import {
  Shield,
  ShieldCheck,
  Network,
  Server,
  Cloud,
  Bug,
  Lock,
  Terminal,
  Activity,
  Search,
  Radar,
  Database,
  Youtube,
  FileText,
  ExternalLink,
  Play,
  BookOpen,
  Calendar,
  Clock,
  Users,
  Video,
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

/* =========================================================
   DEFAULT CYBERSECURITY SERVICES
   Used when Supabase is empty or unavailable.
========================================================= */

const DEFAULT_SERVICES = [
  {
    id: "soc",
    title: "SOC & SIEM Operations",
    description:
      "Monitoring security events, detecting suspicious activities, and investigating threats through centralized security monitoring and log correlation.",
    icon: "ShieldCheck",
    tag: "BLUE TEAM",
    features: [
      "Wazuh SIEM deployment and monitoring",
      "Log collection and event correlation",
      "Suricata IDS/IPS integration",
      "Security alert investigation",
    ],
    tools: ["Wazuh", "Suricata", "Linux", "MITRE ATT&CK"],
  },
  {
    id: "network",
    title: "Network & Infrastructure Security",
    description:
      "Designing and securing network infrastructures through segmentation, access control, firewall policies, and secure communication.",
    icon: "Network",
    tag: "NETWORK SECURITY",
    features: [
      "VLAN design and network segmentation",
      "Firewall rules and ACL configuration",
      "VPN and secure remote access",
      "Network traffic analysis and hardening",
    ],
    tools: ["Cisco", "pfSense", "OpenVPN", "Wireshark"],
  },
  {
    id: "vulnerability",
    title: "Vulnerability Assessment",
    description:
      "Identifying security weaknesses, evaluating infrastructure exposure, and providing actionable recommendations to improve security posture.",
    icon: "Bug",
    tag: "SECURITY TESTING",
    features: [
      "Network and service discovery",
      "Vulnerability scanning",
      "Security misconfiguration analysis",
      "Risk prioritization and remediation",
    ],
    tools: ["Nmap", "Nessus", "OpenVAS", "OWASP ZAP"],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure Security",
    description:
      "Improving the security of cloud and Linux environments through access management, system hardening, and infrastructure protection.",
    icon: "Cloud",
    tag: "CLOUD SECURITY",
    features: [
      "AWS security fundamentals",
      "Linux system hardening",
      "Identity and access management",
      "Infrastructure security configuration",
    ],
    tools: ["AWS", "Linux", "RHCSA", "IAM"],
  },
  {
    id: "devsecops",
    title: "DevSecOps & CI/CD Security",
    description:
      "Integrating security practices into development and deployment workflows to improve automation, reliability, and application security.",
    icon: "Terminal",
    tag: "DEVSECOPS",
    features: [
      "CI/CD pipeline automation",
      "Container security fundamentals",
      "Infrastructure automation",
      "Security checks in deployment workflows",
    ],
    tools: ["Jenkins", "Docker", "Kubernetes", "Ansible"],
  },
  {
    id: "automation",
    title: "Security Automation & Threat Intelligence",
    description:
      "Developing Python-based security tools and automated workflows to enrich security events, analyze threats, and support faster investigations.",
    icon: "Activity",
    tag: "SECURITY AUTOMATION",
    features: [
      "Python security automation",
      "Threat intelligence enrichment",
      "Automated event processing",
      "Risk-based security analysis",
    ],
    tools: ["Python", "FastAPI", "PostgreSQL", "MITRE ATT&CK"],
  },
];

/* =========================================================
   ICON CONFIGURATION
========================================================= */

const SERVICE_ICONS = {
  Shield,
  ShieldCheck,
  Network,
  Server,
  Cloud,
  Bug,
  Lock,
  Terminal,
  Activity,
  Search,
  Radar,
  Database,
};

/* =========================================================
   SAFE LOCAL STORAGE
========================================================= */

const readCache = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const saveCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} cache:`, error);
  }
};

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard = ({
  icon: iconName,
  title,
  description,
  features = [],
  tools = [],
  tag = "CYBERSECURITY",
  index = 0,
}) => {
  const Icon =
    SERVICE_ICONS[iconName] ||
    SERVICE_ICONS.ShieldCheck;

  return (
    <article
      className="group relative h-full"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-slate-950 p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-cyan-500/10 md:p-7">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/20" />

        <div className="relative z-10 flex h-full flex-col">

          {/* Icon and category */}
          <div className="mb-6 flex items-center justify-between">
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20">
              <Icon
                className="h-7 w-7 text-cyan-400"
                strokeWidth={1.6}
              />
            </div>

            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-bold tracking-widest text-cyan-300">
              {tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-300 md:text-2xl">
            {title}
          </h3>

          {/* Description */}
          <p className="mb-6 flex-grow text-sm leading-7 text-slate-400">
            {description}
          </p>

          {/* Features */}
          <div className="mb-6 space-y-3">
            {Array.isArray(features) &&
              features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-start gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  <span>{feature}</span>
                </div>
              ))}
          </div>

          {/* Tools */}
          {Array.isArray(tools) && tools.length > 0 && (
            <div className="border-t border-white/10 pt-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Technologies & Tools
              </p>

              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span
                    key={`${tool}-${index}`}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom hover line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  );
};

/* =========================================================
   EVENT CARD
========================================================= */

const EventCard = ({
  title,
  description,
  event_date: eventDate,
  status,
  registration_link: registrationLink,
  youtube_link: youtubeLink,
  thumbnail,
  platform,
}) => {
  const normalizedStatus = status?.trim().toLowerCase();

  const isCompleted = normalizedStatus === "completed";
  const isComingSoon =
    normalizedStatus === "coming_soon" || !normalizedStatus;

  const dateLabel = eventDate || "Coming Soon";

  const normalizedYoutubeLink = youtubeLink?.trim();
  const normalizedRegistrationLink = registrationLink?.trim();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30">

      {thumbnail && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={thumbnail}
            alt={title || "Cybersecurity event"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
              isCompleted
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : isComingSoon
                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                  : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
            }`}
          >
            {isCompleted
              ? "Completed"
              : isComingSoon
                ? "Coming Soon"
                : "Upcoming"}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            {dateLabel}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
          {title}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-7 text-slate-400">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="h-4 w-4" />
            {platform || "Online"}
          </span>

          {isCompleted && normalizedYoutubeLink ? (
            <a
              href={normalizedYoutubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
            >
              <Video className="h-4 w-4" />
              Watch Recording
            </a>
          ) : !isCompleted && normalizedRegistrationLink ? (
            <a
              href={normalizedRegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Register Now
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-500">
              {isCompleted ? "Event completed" : "Details coming soon"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   TECHNICAL CONTENT CARD
========================================================= */

const ContentCard = ({
  platform,
  title,
  description,
  link,
  thumbnail,
}) => {
  if (!link) return null;

  const normalizedPlatform = platform?.toLowerCase();

  const isYoutube = normalizedPlatform === "youtube";
  const isMedium = normalizedPlatform === "medium";

  const Icon = isYoutube
    ? Youtube
    : isMedium
      ? FileText
      : BookOpen;

  const accentColor = isYoutube
    ? "text-red-400"
    : isMedium
      ? "text-green-400"
      : "text-cyan-400";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
    >
      {thumbnail && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={thumbnail}
            alt={title || "Technical content"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

          {isYoutube && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-red-600 p-4 transition-transform group-hover:scale-110">
                <Play
                  className="h-6 w-6 text-white"
                  fill="white"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className={`mb-3 flex items-center gap-2 ${accentColor}`}>
          <Icon className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {platform || "Technical Content"}
          </span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
          {title}
        </h3>

        {description && (
          <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-400">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
          Explore Content
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
};

/* =========================================================
   MAIN SERVICES PAGE
========================================================= */

const Services = () => {
  // Show professional default services immediately.
  const [services, setServices] = useState(DEFAULT_SERVICES);

  const [contentLinks, setContentLinks] = useState(() =>
    readCache("content_links")
  );

  const [events, setEvents] = useState(() =>
    readCache("events")
  );

  const [loading, setLoading] = useState(true);

  /* Initialize animations */
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  /* Fetch portfolio data from Supabase */
  const fetchData = useCallback(async () => {
    try {
      const [
        servicesResponse,
        contentResponse,
        eventsResponse,
      ] = await Promise.all([
        supabase
          .from("services")
          .select("*")
          .order("id", { ascending: true }),

        supabase
          .from("content_links")
          .select("*")
          .order("id", { ascending: true }),

        supabase
          .from("events")
          .select("*")
          .order("id", { ascending: false }),
      ]);

      /* Services: fallback if the table is empty or unavailable */
      if (servicesResponse.error) {
        console.warn(
          "Using default cybersecurity services:",
          servicesResponse.error.message
        );

        setServices(DEFAULT_SERVICES);
      } else if (
        Array.isArray(servicesResponse.data) &&
        servicesResponse.data.length > 0
      ) {
        setServices(servicesResponse.data);
      } else {
        setServices(DEFAULT_SERVICES);
      }

      /* Technical content */
      if (contentResponse.error) {
        console.warn(
          "Could not load technical content:",
          contentResponse.error.message
        );
      } else {
        const data = contentResponse.data || [];
        setContentLinks(data);
        saveCache("content_links", data);
      }

      /* Events */
      if (eventsResponse.error) {
        console.warn(
          "Could not load events:",
          eventsResponse.error.message
        );
      } else {
        const data = eventsResponse.data || [];
        setEvents(data);
        saveCache("events", data);
      }
    } catch (error) {
      console.error("Portfolio data loading error:", error);
      setServices(DEFAULT_SERVICES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* Refresh AOS when dynamic content changes */
  useEffect(() => {
    AOS.refresh();
  }, [services, contentLinks, events]);

  return (
    <main
      id="Services"
      className="w-full overflow-hidden bg-[#030014] px-[5%] py-20 md:px-[10%] md:py-28"
    >

      {/* ===================================================
          SECTION 1 — INTRODUCTION
      =================================================== */}

      <section className="mb-16 text-center md:mb-20" data-aos="fade-up">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Cybersecurity & Infrastructure
          </span>
        </div>

        <h1 className="mb-5 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-4xl font-extrabold text-transparent md:text-6xl">
          Security Services
        </h1>

        <p className="mx-auto max-w-3xl text-sm leading-8 text-slate-400 md:text-lg">
          Exploring and building secure digital infrastructures through
          cybersecurity, security operations, network engineering,
          cloud technologies, and DevSecOps practices.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            Security First
          </span>

          <span className="text-slate-700">|</span>

          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            Continuous Improvement
          </span>

          <span className="text-slate-700">|</span>

          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-cyan-400" />
            Secure Infrastructure
          </span>
        </div>
      </section>

      {/* ===================================================
          SECTION 2 — SERVICES
      =================================================== */}

      <section className="mb-24">

        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            What I Work On
          </span>

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Areas of Expertise
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Technical areas where I develop practical solutions,
            strengthen my expertise, and apply cybersecurity
            principles to real-world environments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || service.title || index}
              {...service}
              index={index}
            />
          ))}
        </div>

        {loading && (
          <p className="mt-6 text-center text-xs text-slate-500">
            Synchronizing portfolio data...
          </p>
        )}
      </section>

      {/* ===================================================
          SECTION 3 — EVENTS
      =================================================== */}

      {events.length > 0 && (
        <section className="mb-24">

          <div className="mb-10 text-center" data-aos="fade-up">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Learning & Community
            </span>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Cybersecurity Activities & Events
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Workshops, technical events, cybersecurity
              communities, and knowledge-sharing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={event.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================
          SECTION 4 — TECHNICAL CONTENT
      =================================================== */}

      {contentLinks.length > 0 && (
        <section className="mb-24">

          <div className="mb-10 text-center" data-aos="fade-up">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Knowledge Sharing
            </span>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Technical Articles & Research
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Discover technical demonstrations, cybersecurity
              research, practical write-ups, and learning resources.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contentLinks.map((content, index) => (
              <div
                key={content.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <ContentCard {...content} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================
          SECTION 5 — CONTACT CTA
      =================================================== */}

      <section
        className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-[#07152b] to-slate-950 px-6 py-12 text-center md:px-12 md:py-16"
        data-aos="fade-up"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
            <Shield className="h-8 w-8 text-cyan-400" />
          </div>

          <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">
            Let's Build a More Secure Future
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Interested in cybersecurity, network security,
            SOC operations, or DevSecOps opportunities?
            Let's connect and discuss ideas, projects, and collaboration.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:tlilihamza725@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:-translate-y-1 hover:bg-cyan-400"
            >
              <Mail className="h-5 w-5" />
              Contact Me
              <ChevronRight className="h-4 w-4" />
            </a>

            <a
              href="tel:+21698610181"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >
              <Phone className="h-5 w-5" />
              Call Me
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;
