
import React from "react";
import { Home, ArrowLeft, ShieldAlert, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-16 overflow-hidden relative">

      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">

        {/* Security Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
            <ShieldAlert className="w-9 h-9 text-cyan-400" />
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            404
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Message */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
            Access Denied? Not Quite.
          </h2>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to a secure destination.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-64 h-48 sm:w-80 sm:h-56 mx-auto">
            <DotLottieReact
              src="https://lottie.host/d4d86b79-5663-40f6-a574-df2dbb5de7d4/5s1hLAVkch.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Error Information */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm mb-8">
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Error Code: HTTP 404 – Page Not Found</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            <Home size={20} />
            Home Page
          </button>

        </div>

        {/* Footer */}
        <p className="mt-12 text-gray-600 text-sm">
          © {new Date().getFullYear()} Hamza Tlili · Cybersecurity Portfolio
        </p>

      </div>
    </section>
  );
}
