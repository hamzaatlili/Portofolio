import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import AOS from "aos";
import "aos/dist/aos.css";

import {
  Code,
  Award,
  Boxes,
  ShieldCheck,
  Terminal,
  Lock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileBadge,
  X,
} from "lucide-react";

// ============================================
// ⭐ TES PROJETS — MODIFIE ICI POUR AJOUTER
// ============================================
const myProjects = [
  {
    id: "soc-intelligent",
    Title: "SOC Intelligent – Risk-Based Security Monitoring",
    Description:
      "Risk-oriented SOC platform built in a lab environment. Wazuh and Suricata collect and detect security events, a Python engine stores and scores them in PostgreSQL, and a Streamlit dashboard presents the results.\n\nAttack scenarios are simulated from Kali Linux and OWASP ZAP against a vulnerable web application to validate detection and alerting.",
    Img: null,
    Link: null,
    Technologies: [
      "Wazuh",
      "Suricata",
      "Python",
      "PostgreSQL",
      "Streamlit",
      "Kali Linux",
      "OWASP ZAP",
    ],
  },
  {
    id: "sms2i-cicd",
    Title: "CI/CD & Deployment Automation – SMS2i",
    Description:
      "Project carried out at SMS2i from February to May 2026. Design of a CI/CD pipeline and automated deployment for a Java Spring Boot and Angular application, using Jenkins for the pipeline and Ansible for infrastructure automation.\n\nMonitoring of the deployed services is handled with Prometheus and Grafana.",
    Img: null,
    Link: null,
    Technologies: [
      "Java Spring Boot",
      "Angular",
      "Jenkins",
      "Ansible",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    id: "la-poste-network",
    Title: "Secure Enterprise Network – La Poste Tunisienne",
    Description:
      "Network architecture project at La Poste Tunisienne (Ariana office), August to September 2025. Design of a secure enterprise network with segmentation, redundancy, controlled access and core network services.\n\nIncludes firewalling with Cisco ASA, VLAN segmentation, OSPF routing, HSRP redundancy, a DMZ, ACL and NAT policies, DNS, DHCP, RADIUS authentication and VoIP.",
    Img: null,
    Link: null,
    Technologies: [
      "Cisco ASA",
      "VLAN",
      "OSPF",
      "HSRP",
      "DMZ",
      "ACL",
      "NAT",
      "DNS",
      "DHCP",
      "RADIUS",
      "VoIP",
    ],
  },
  {
    id: "phishguard-ai",
    Title: "PhishGuard AI – Phishing Detection",
    Description:
      "Machine learning project that detects phishing attempts. Models are trained with Scikit-learn and XGBoost, and the detection is exposed through a FastAPI service.",
    Img: null,
    Link: "https://github.com/hamzaatlili/phishguard-ai",
    Technologies: ["Python", "FastAPI", "XGBoost", "Scikit-learn"],
  },
];

// ============================================
// TECHNOLOGIES
// ============================================
const techStacks = [
  { name: "Wazuh", logo: "/wazuh.png", fallback: "W" },
  { name: "Splunk", logo: "https://cdn.simpleicons.org/splunk/65A637", fallback: "SP" },
  { name: "ELK Stack", logo: "https://cdn.simpleicons.org/elastic/FEC514", fallback: "ELK" },
  { name: "Suricata", logo: "/suricata.jpg", fallback: "S" },
  { name: "Snort", logo: "https://cdn.simpleicons.org/snort", fallback: "S" },
  { name: "Nmap", logo: "https://cdn.simpleicons.org/nmap/4A90E2", fallback: "N" },
  { name: "Nessus", logo: "/nessus.png", fallback: "N" },
  { name: "Wireshark", logo: "https://cdn.simpleicons.org/wireshark/1679A7", fallback: "W" },
  { name: "Cisco", logo: "https://cdn.simpleicons.org/cisco/049FD9", fallback: "C" },
  { name: "pfSense", logo: "https://cdn.simpleicons.org/pfsense/212121", fallback: "P" },
  { name: "OpenVPN", logo: "https://cdn.simpleicons.org/openvpn/EA7E20", fallback: "VPN" },
  { name: "Linux", logo: "https://cdn.simpleicons.org/linux/FCC624", fallback: "L" },
  { name: "Kali Linux", logo: "https://cdn.simpleicons.org/kalilinux/557C94", fallback: "K" },
  { name: "Python", logo: "/python.svg", fallback: "Py" },
  { name: "AWS", logo: "/aws.png", fallback: "AWS" },
  { name: "Docker", logo: "/docker.svg", fallback: "D" },
  { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes/326CE5", fallback: "K" },
  { name: "Jenkins", logo: "https://cdn.simpleicons.org/jenkins/D24939", fallback: "J" },
  { name: "Ansible", logo: "https://cdn.simpleicons.org/ansible/EE0000", fallback: "A" },
  { name: "Git", logo: "/git.svg", fallback: "G" },
  { name: "GitHub Actions", logo: "https://cdn.simpleicons.org/githubactions/FFFFFF", fallback: "GH" },
  { name: "Prometheus", logo: "https://cdn.simpleicons.org/prometheus/E6522C", fallback: "P" },
  { name: "Grafana", logo: "https://cdn.simpleicons.org/grafana/F46800", fallback: "G" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1", fallback: "PG" },
];

// ============================================
// ⭐ TES CERTIFICATS — MODIFIE ICI POUR AJOUTER
// ============================================
const myCertificates = [
  {
    id: "jenkins",
    title: "Advanced Jenkins",
    issuer: "KodeKloud",
    date: "February 2026",
    file: "/certifications/Advanced%20Jenkins.png",
    type: "image",
    category: "DevOps",
  },
  {
    id: "aws-architecting",
    title: "AWS Academy Graduate – Cloud Architecting",
    issuer: "Amazon Web Services",
    date: "December 2025",
    file: "/certifications/aws.jpg",
    type: "image",
    category: "Cloud",
  },
  {
    id: "datacamp",
    title: "CI/CD for Machine Learning (Advanced)",
    issuer: "DataCamp",
    date: "February 2026",
    file: "/certifications/CI%20CD.png",
    type: "image",
    category: "MLOps",
  },
  {
    id: "aws-foundations",
    title: "AWS Academy Graduate – Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "December 2025",
    file: "/certifications/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20251204-31-2btx24.pdf",
    type: "pdf",
    category: "Cloud",
  },
  {
    id: "junior-cybersecurity",
    title: "Junior Cybersecurity Analyst",
    issuer: "Cisco",
    date: "October 2026",
    file: "/certifications/JuniorCybersecurityAnalyst.pdf",
    type: "pdf",
    category: "Cybersecurity",
  },
];

// ============================================
// HELPER
// ============================================
function parseTechnologies(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

// ============================================
// TECHNOLOGY CARD
// ============================================
function TechnologyCard({ technology }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative min-h-[165px] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 bg-slate-800/60 border border-white/5 hover:border-cyan-400/40 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform">
        {technology.logo && !imageError ? (
          <img
            src={technology.logo}
            alt={`${technology.name} logo`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-16 h-16 object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-400/20">
            <span className="text-xl font-bold text-cyan-400">
              {technology.fallback}
            </span>
          </div>
        )}
      </div>

      <h4 className="relative text-sm md:text-base font-semibold text-slate-300 group-hover:text-white text-center">
        {technology.name}
      </h4>
    </div>
  );
}

TechnologyCard.propTypes = {
  technology: PropTypes.object.isRequired,
};

// ============================================
// PROJECT CARD
// ============================================
function ProjectCard({ project, onDetails }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 h-full flex flex-col">
      <div className="relative h-52 overflow-hidden bg-slate-800">
        {project.Img ? (
          <img
            src={project.Img}
            alt={project.Title || "Project"}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-indigo-600/20">
            <Code size={55} className="text-cyan-400" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/70 to-transparent" />

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 backdrop-blur-md">
          Featured Project
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
          {project.Title || "Untitled Project"}
        </h3>

        <p className="text-slate-400 text-sm leading-7 line-clamp-4 flex-1">
          {project.Description || "Project description coming soon."}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          {project.Link && (
            <a
              href={project.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-500 text-white text-sm font-semibold hover:bg-cyan-400 transition-colors"
            >
              Live Demo
              <ExternalLink size={15} />
            </a>
          )}

          <button
            type="button"
            onClick={() => onDetails(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors"
          >
            Details
            <Code size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  onDetails: PropTypes.func.isRequired,
};

// ============================================
// PROJECT DETAILS MODAL
// ============================================
function ProjectDetailsModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const technologies = parseTechnologies(project.Technologies);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Project details"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b1120] border border-cyan-500/20 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-cyan-500 transition-colors"
        >
          <X size={20} />
        </button>

        {project.Img && (
          <img
            src={project.Img}
            alt={project.Title || "Project"}
            className="w-full max-h-72 object-cover"
          />
        )}

        <div className="p-7">
          <span className="text-cyan-400 text-xs font-semibold uppercase">
            Project Details
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-5">
            {project.Title || "Untitled Project"}
          </h2>

          <p className="text-slate-300 leading-8 whitespace-pre-line">
            {project.Description || "No additional description available."}
          </p>

          {technologies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="px-3 py-1.5 rounded-lg text-xs bg-cyan-500/10 text-cyan-200 border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.Link && (
            <a
              href={project.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors"
            >
              Visit Project
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

ProjectDetailsModal.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ============================================
// CERTIFICATE CARD
// ============================================
function CertificateCard({ certificate }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 h-full flex flex-col">
      <div className="relative h-[230px] bg-slate-800 overflow-hidden">
        {certificate.type === "pdf" ? (
          <iframe
            src={`${certificate.file}#toolbar=0&navpanes=0`}
            title={certificate.title}
            className="w-full h-full bg-white pointer-events-none"
          />
        ) : !imageError ? (
          <img
            src={certificate.file}
            alt={certificate.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain bg-slate-800 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-cyan-400">
            <FileBadge size={55} />
            <span className="text-sm">Preview unavailable</span>
          </div>
        )}

        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/90 text-white">
          {certificate.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
          {certificate.title}
        </h3>

        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-slate-400 text-sm">{certificate.issuer}</span>
          <span className="text-slate-500 text-xs">{certificate.date}</span>
        </div>

        <a
          href={certificate.file}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/10 text-slate-300 text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
        >
          Open Credential
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}

CertificateCard.propTypes = {
  certificate: PropTypes.object.isRequired,
};

// ============================================
// TOGGLE BUTTON
// ============================================
function ToggleButton({ onClick, isShowingMore }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="px-5 py-2.5 text-slate-300 hover:text-white text-sm font-medium transition-all flex items-center gap-2 bg-white/5 hover:bg-cyan-500/10 rounded-lg border border-white/10 hover:border-cyan-500/30"
    >
      {isShowingMore ? "See Less" : "See More"}
      {isShowingMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );
}

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

// ============================================
// TAB PANEL
// ============================================
function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`portfolio-tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// ============================================
// MAIN PORTFOLIO
// ============================================
export default function Portofolio() {
  const [value, setValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = useMediaQuery("(max-width:767px)");
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 80,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const displayedProjects = showAllProjects
    ? myProjects
    : myProjects.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? myCertificates
    : myCertificates.slice(0, initialItems);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* HEADER */}
      <div className="text-center pb-10" data-aos="fade-up">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <ShieldCheck className="w-9 h-9 text-cyan-400" />
          </div>
        </div>

        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Cybersecurity Portfolio
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-4 leading-relaxed">
          I build secure, automated and reliable infrastructures through
          cybersecurity, SOC operations, network security, cloud engineering
          and DevSecOps.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="px-4 py-2 rounded-full text-xs border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
            Cybersecurity Engineer
          </span>
          <span className="px-4 py-2 rounded-full text-xs border border-blue-400/20 bg-blue-500/10 text-blue-300">
            SOC Analyst
          </span>
          <span className="px-4 py-2 rounded-full text-xs border border-purple-400/20 bg-purple-500/10 text-purple-300">
            DevSecOps
          </span>
        </div>
      </div>

      {/* TABS */}
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(6,182,212,0.04), rgba(59,130,246,0.04))",
            backdropFilter: "blur(10px)",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Portfolio sections"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.72rem", sm: "0.9rem", md: "1rem" },
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.3s ease",
                padding: { xs: "12px 4px", sm: "20px 0" },
                margin: "6px",
                borderRadius: "12px",
                minWidth: 0,
                "&:hover": {
                  color: "#fff",
                  backgroundColor: "rgba(6,182,212,0.1)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))",
                },
              },
              "& .MuiTabs-flexContainer": { gap: "4px" },
              "& .MuiTabs-indicator": { height: 0 },
            }}
          >
            <Tab icon={<Code size={19} />} label="Projects" />
            <Tab icon={<Award size={19} />} label="Certificates" />
            <Tab icon={<Boxes size={19} />} label="Tech Stack" />
          </Tabs>
        </AppBar>

        {/* PROJECTS */}
        <TabPanel value={value} index={0}>
          <div className="text-center mb-9">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Portfolio Showcase
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Explore my cybersecurity, software development and cloud
              engineering projects. Each project reflects my technical skills
              and practical experience.
            </p>
          </div>

          {myProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos="fade-up"
                    data-aos-delay={Math.min(index * 80, 400)}
                  >
                    <ProjectCard
                      project={project}
                      onDetails={setSelectedProject}
                    />
                  </div>
                ))}
              </div>

              {myProjects.length > initialItems && (
                <div className="mt-8 flex justify-center">
                  <ToggleButton
                    onClick={() => setShowAllProjects((prev) => !prev)}
                    isShowingMore={showAllProjects}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
              <Terminal className="w-12 h-12 text-cyan-500/50 mx-auto mb-4" />
              <p className="text-gray-400">Projects will be available soon.</p>
            </div>
          )}
        </TabPanel>

        {/* CERTIFICATES */}
        <TabPanel value={value} index={1}>
          <div className="text-center mb-9">
            <div className="flex justify-center mb-3">
              <Award className="w-8 h-8 text-cyan-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Certifications & Professional Training
            </h3>

            <p className="text-slate-400 text-sm mt-3">
              Professional credentials and technical training in Cybersecurity,
              Cloud, Networking and DevOps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedCertificates.map((certificate, index) => (
              <div
                key={certificate.id}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 80, 400)}
              >
                <CertificateCard certificate={certificate} />
              </div>
            ))}
          </div>

          {myCertificates.length > initialItems && (
            <div className="mt-8 flex justify-center">
              <ToggleButton
                onClick={() => setShowAllCertificates((prev) => !prev)}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        {/* TECH STACK */}
        <TabPanel value={value} index={2}>
          <div className="text-center mb-9">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              My Technical Arsenal
            </h3>

            <p className="text-slate-400 text-sm">
              {techStacks.length} technologies across Cybersecurity, SOC,
              Network Security, Cloud and DevSecOps.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStacks.map((technology, index) => (
              <div
                key={technology.name}
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 40, 400)}
              >
                <TechnologyCard technology={technology} />
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.07] to-blue-500/[0.07]">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-cyan-400" />
              <h4 className="text-white font-semibold">Continuous Learning</h4>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              I continuously improve my technical skills through hands-on labs,
              cybersecurity projects, professional certifications and practical
              experimentation with modern technologies.
            </p>
          </div>
        </TabPanel>
      </Box>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}