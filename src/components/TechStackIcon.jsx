
import { useEffect, useState } from "react";
import {
  Linkedin,
  Github,
  Phone,
  ExternalLink,
  Shield,
  Cloud,
  Network,
  Code2,
  Terminal,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

// ==========================================
// TECHNOLOGIES
// Local images must be inside the public folder.
// Example: public/wazuh.png -> /wazuh.png
// ==========================================

const technologies = [
  {
    category: "SOC & Cybersecurity",
    icon: Shield,
    items: [
      { name: "Wazuh", logo: "/wazuh.png", fallback: "W" },
      { name: "Suricata", logo: "/suricata.jpg", fallback: "S" },
      { name: "Nessus", logo: "/nessus.png", fallback: "N" },
      { name: "AWS Security", logo: "/aws.png", fallback: "AWS" },
      { name: "Snort", logo: "https://cdn.simpleicons.org/snort", fallback: "S" },
      { name: "Splunk", logo: "https://cdn.simpleicons.org/splunk", fallback: "SP" },
      { name: "Elastic Stack", logo: "https://cdn.simpleicons.org/elastic", fallback: "E" },
      { name: "Nmap", logo: null, fallback: "N" },
      { name: "OpenVAS", logo: null, fallback: "O" },
      { name: "Wireshark", logo: "https://cdn.simpleicons.org/wireshark", fallback: "W" },
      { name: "OWASP ZAP", logo: "https://cdn.simpleicons.org/owasp", fallback: "Z" },
    ],
  },
  {
    category: "Network Security",
    icon: Network,
    items: [
      { name: "Cisco", logo: "https://cdn.simpleicons.org/cisco", fallback: "C" },
      { name: "pfSense", logo: null, fallback: "P" },
      { name: "OpenVPN", logo: "https://cdn.simpleicons.org/openvpn", fallback: "VPN" },
      { name: "Linux", logo: "https://cdn.simpleicons.org/linux", fallback: "L" },
      { name: "RADIUS", logo: null, fallback: "R" },
      { name: "PKI", logo: null, fallback: "PKI" },
    ],
  },
  {
    category: "Cloud & DevSecOps",
    icon: Cloud,
    items: [
      { name: "AWS", logo: "/aws.png", fallback: "AWS" },
      { name: "Docker", logo: "/docker.svg", fallback: "D" },
      { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes", fallback: "K" },
      { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins", fallback: "J" },
      { name: "Ansible", logo: "https://cdn.simpleicons.org/ansible", fallback: "A" },
      { name: "Git", logo: "/git.svg", fallback: "G" },
      { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions", fallback: "GH" },
      { name: "Prometheus", logo: "https://cdn.simpleicons.org/prometheus", fallback: "P" },
      { name: "Grafana", logo: "https://cdn.simpleicons.org/grafana", fallback: "G" },
    ],
  },
  {
    category: "Programming & Databases",
    icon: Code2,
    items: [
      { name: "Python", logo: "/python.svg", fallback: "Py" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi", fallback: "F" },
      { name: "Java", logo: "/java.svg", fallback: "J" },
      { name: "React", logo: "/reactjs.svg", fallback: "R" },
      { name: "Angular", logo: "https://cdn.simpleicons.org/angular", fallback: "A" },
      { name: "JavaScript", logo: "/javascript.svg", fallback: "JS" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", fallback: "PG" },
      { name: "MySQL", logo: "/mysql.svg", fallback: "M" },
      { name: "MongoDB", logo: "/mongodb.svg", fallback: "DB" },
    ],
  },
];

// ==========================================
// SOCIAL LINKS
// ==========================================

const socialLinks = [
  {
    name: "LinkedIn",
    username: "hamza-tlili",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hamza-tlili-/",
    color: "#0A66C2",
    external: true,
  },
  {
    name: "GitHub",
    username: "hamzaatlili",
    icon: Github,
    url: "https://github.com/hamzaatlili",
    color: "#FFFFFF",
    external: true,
  },
  {
    name: "Phone",
    username: "+216 98 610 181",
    icon: Phone,
    url: "tel:+21698610181",
    color: "#22C55E",
    external: false,
  },
];

// ==========================================
// TECHNOLOGY CARD
// ==========================================

const TechnologyCard = ({ tech, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 50, 400)}
      className="group relative flex min-h-[145px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_10px_35px_rgba(34,211,238,0.12)]"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-cyan-400/30">
        {tech.logo && !imageError ? (
          <img
            src={tech.logo}
            alt={`${tech.name} logo`}
            className="h-10 w-10 object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-xl font-bold text-cyan-400">
            {tech.fallback}
          </span>
        )}
      </div>

      <span className="relative text-center text-sm font-semibold text-gray-300 transition-colors group-hover:text-white">
        {tech.name}
      </span>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const TechStackIcon = () => {
  useEffect(() => {
    AOS.init({
      offset: 10,
      once: true,
      duration: 700,
      easing: "ease-out-cubic",
    });

    AOS.refresh();

    return () => {
      AOS.refreshHard();
    };
  }, []);

  return (
    <section className="w-full space-y-12">

      {/* TECHNOLOGY CATEGORIES */}

      {technologies.map((category) => {
        const CategoryIcon = category.icon;

        return (
          <div key={category.category}>

            <div
              className="mb-6 flex items-center gap-3"
              data-aos="fade-right"
            >
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 p-2">
                <CategoryIcon className="h-5 w-5 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold text-white">
                {category.category}
              </h3>

              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {category.items.map((tech, index) => (
                <TechnologyCard
                  key={tech.name}
                  tech={tech}
                  index={index}
                />
              ))}
            </div>

          </div>
        );
      })}

      {/* SOCIAL LINKS */}

      <div className="border-t border-white/10 pt-8">

        <div
          className="mb-6 flex items-center gap-3"
          data-aos="fade-right"
        >
          <div className="rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-2">
            <Terminal className="h-5 w-5 text-indigo-400" />
          </div>

          <h3 className="text-xl font-bold text-white">
            Connect With Me
          </h3>

          <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {socialLinks.map((social, index) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">

                  <Icon
                    className="h-6 w-6"
                    style={{ color: social.color }}
                  />

                  <div className="flex flex-col">
                    <span className="font-bold text-gray-200 group-hover:text-white">
                      {social.name}
                    </span>

                    <span className="text-sm text-gray-400">
                      {social.username}
                    </span>
                  </div>

                </div>

                {social.external && (
                  <ExternalLink className="h-4 w-4 text-gray-500 transition-colors group-hover:text-cyan-400" />
                )}
              </a>
            );
          })}

        </div>
      </div>

    </section>
  );
};

export default TechStackIcon;
