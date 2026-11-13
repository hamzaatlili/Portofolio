
import { useEffect } from "react";
import {
  Linkedin,
  Github,
  Phone,
  ExternalLink,
} from "lucide-react";

import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "LinkedIn",
    subText: "hamza-tlili",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/hamza-tlili-/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    external: true,
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "hamzaatlili",
    icon: Github,
    url: "https://github.com/hamzaatlili",
    color: "#FFFFFF",
    gradient: "from-gray-600 to-gray-900",
    external: true,
  },
  {
    name: "Phone",
    displayName: "Phone",
    subText: "+216 98 610 181",
    icon: Phone,
    url: "tel:+21698610181",
    color: "#22C55E",
    gradient: "from-green-500 to-emerald-600",
    external: false,
  },
];

const SocialLinks = () => {
  useEffect(() => {
    AOS.init({
      offset: 10,
      once: true,
      duration: 700,
    });
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5
      rounded-2xl p-6 py-8 backdrop-blur-xl border border-white/10">

      <h3
        className="text-xl font-semibold text-white mb-6
          flex items-center gap-2"
        data-aos="fade-down"
      >
        <span className="inline-block w-8 h-1
          bg-cyan-500 rounded-full" />
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <a
              key={link.name}
              href={link.url}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group relative flex items-center justify-between
                p-4 rounded-xl bg-white/5 border border-white/10
                overflow-hidden hover:border-white/20
                transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Hover background */}
              <div
                className={`absolute inset-0 opacity-0
                  group-hover:opacity-20 transition-opacity
                  duration-500 bg-gradient-to-r ${link.gradient}`}
              />

              {/* Social information */}
              <div className="relative flex items-center gap-4">
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-20 rounded-lg
                      transition-all duration-500
                      group-hover:scale-110 group-hover:opacity-30"
                    style={{ backgroundColor: link.color }}
                  />

                  <div className="relative p-2.5 rounded-lg">
                    <Icon
                      className="w-6 h-6 transition-all duration-500
                        group-hover:scale-110"
                      style={{ color: link.color }}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-bold
                    text-gray-200 tracking-tight leading-tight
                    group-hover:text-white transition-colors">
                    {link.displayName}
                  </span>

                  <span className="text-sm text-gray-400
                    group-hover:text-gray-300 transition-colors">
                    {link.subText}
                  </span>
                </div>
              </div>

              {/* External link icon */}
              <ExternalLink
                className="relative w-5 h-5 text-gray-500
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  transform group-hover:translate-x-0
                  -translate-x-1"
              />

              {/* Hover animation */}
              <div className="absolute inset-0 opacity-0
                group-hover:opacity-100 pointer-events-none overflow-hidden">
                <div className="absolute inset-0
                  bg-gradient-to-r from-transparent via-white/10
                  to-transparent translate-x-[-100%]
                  group-hover:translate-x-[100%]
                  transition-transform duration-1000" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
