
import React, { useState, useEffect } from "react";

import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Linkedin,
  MapPin,
  Globe,
  BriefcaseBusiness,
} from "lucide-react";

import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const CONTACT = {
  name: "Hamza Tlili",
  email: "tlilihamza725@gmail.com",
  location: "Ariana, Tunisia",
  linkedin: "https://www.linkedin.com/in/hamza-tlili-",
  role: "Cybersecurity Engineer | SOC Analyst",
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 50,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      submitData.append("name", formData.name.trim());
      submitData.append("email", formData.email.trim());
      submitData.append("message", formData.message.trim());
      submitData.append(
        "_subject",
        `New Portfolio Contact - ${CONTACT.name}`
      );
      submitData.append("_template", "table");

      const response = await axios.post(
        `https://formsubmit.co/ajax/${CONTACT.email}`,
        submitData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data.success !== "true" &&
          response.data.success !== true) {
        throw new Error("Email submission was not confirmed.");
      }

      await Swal.fire({
        title: "Message Sent!",
        text: "Thank you for contacting me. I will get back to you soon.",
        icon: "success",
        confirmButtonColor: "#06b6d4",
        background: "#080d20",
        color: "#ffffff",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Contact form error:", error);

      Swal.fire({
        title: "Message Not Sent",
        text: "Something went wrong. Please try again or contact me directly by email.",
        icon: "error",
        confirmButtonColor: "#0891b2",
        background: "#080d20",
        color: "#ffffff",
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="px-[5%] sm:px-[5%] lg:px-[10%] pb-16"
      id="Contact"
    >
      {/* SECTION HEADER */}

      <div className="text-center lg:mt-[5%] mt-10 mb-10">

        <p className="text-cyan-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Let's Connect
        </p>

        <h2
          data-aos="fade-down"
          className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Contact Me
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Have a cybersecurity project, job opportunity, internship,
          or technical idea? Let's discuss how we can work together.
        </p>

      </div>

      <div className="flex items-center justify-center">

        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">

          {/* CONTACT FORM */}

          <div
            data-aos="fade-right"
            className="bg-white/5 backdrop-blur-xl border border-cyan-500/10 rounded-3xl shadow-2xl p-6 sm:p-10 hover:border-cyan-500/30 transition-all duration-500"
          >

            <div className="flex justify-between items-start mb-8">

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Send a Message
                </h3>

                <p className="text-gray-400 text-sm">
                  I'll get back to you as soon as possible.
                </p>
              </div>

              <Share2 className="w-9 h-9 text-cyan-400 opacity-70" />

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}

              <div className="relative group">

                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={100}
                  required
                  className="w-full p-4 pl-12 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                />

              </div>

              {/* EMAIL */}

              <div className="relative group">

                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={254}
                  required
                  className="w-full p-4 pl-12 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                />

              </div>

              {/* MESSAGE */}

              <div className="relative group">

                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />

                <textarea
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  maxLength={5000}
                  required
                  rows={6}
                  className="w-full resize-none p-4 pl-12 bg-white/5 rounded-xl border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                <Send className="w-5 h-5" />

                {isSubmitting ? "Sending..." : "Send Message"}

              </button>

            </form>

          </div>

          {/* PERSONAL INFORMATION */}

          <div
            data-aos="fade-left"
            className="bg-white/5 backdrop-blur-xl border border-cyan-500/10 rounded-3xl shadow-2xl p-6 sm:p-10 hover:border-cyan-500/30 transition-all duration-500"
          >

            <div className="flex justify-between items-start mb-8">

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Let's Work Together
                </h3>

                <p className="text-gray-400 text-sm">
                  Open to professional opportunities.
                </p>
              </div>

              <ShieldCheck className="w-10 h-10 text-cyan-400 opacity-70" />

            </div>

            {/* PROFILE DESCRIPTION */}

            <p className="text-gray-300 leading-8 mb-8">
              I'm <span className="text-cyan-400 font-semibold">{CONTACT.name}</span>,
              a Computer Engineer specialized in Networks and Security.

              I'm interested in cybersecurity, SOC operations,
              SIEM monitoring, network security, cloud security,
              and DevSecOps.

              <br />
              <br />

              I'm open to junior cybersecurity positions,
              internships, technical collaborations, and
              international professional opportunities.
            </p>

            {/* PROFESSIONAL DETAILS */}

            <div className="border-t border-white/10 pt-7">

              <h4 className="text-white font-semibold text-lg mb-5">
                Professional Information
              </h4>

              <div className="space-y-5">

                {/* EMAIL */}

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors break-all"
                >

                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>

                  <span>{CONTACT.email}</span>

                </a>

                {/* LOCATION */}

                <div className="flex items-center gap-4 text-gray-300">

                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>

                  <span>{CONTACT.location}</span>

                </div>

                {/* ROLE */}

                <div className="flex items-center gap-4 text-gray-300">

                  <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <BriefcaseBusiness className="w-5 h-5 text-cyan-400" />
                  </div>

                  <span>{CONTACT.role}</span>

                </div>

              </div>

            </div>

            {/* SOCIAL NETWORK */}

            <div className="border-t border-white/10 mt-7 pt-7">

              <h4 className="text-white font-semibold text-lg mb-5">
                Professional Network
              </h4>

              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              >

                <Linkedin className="w-5 h-5" />

                LinkedIn Profile

              </a>

              <div className="mt-6">
                <SocialLinks />
              </div>

            </div>

            {/* AVAILABILITY */}

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-400">

              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              Available for professional opportunities

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactPage;
