jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#030014]">
      <div className="text-center max-w-xl">

        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[#6366f1]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Thank You!
        </h1>

        <p className="text-gray-400 text-lg mb-4">
          Your message has been successfully received.
        </p>

        <p className="text-gray-500 mb-8">
          Thank you for reaching out. I'll review your message and get back
          to you as soon as possible.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98]"
        >
          Back to Portfolio
        </Link>

      </div>
    </div>
  );
};

export default ThankYouPage;