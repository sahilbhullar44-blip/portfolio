"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Terminal } from "lucide-react";
import { sendEmail } from "@/app/actions";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);

    try {
      const result = await sendEmail(formData);
      if (result?.success) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent w-full"
            style={{ top: `${15 + i * 18}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 11 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-linear-to-b from-transparent via-cyan-500/20 to-transparent h-full"
            style={{ left: `${15 + i * 18}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Section Shadow Overlays */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-linear-to-b from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-linear-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-900 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left pt-8 lg:pt-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            {`Let's `}
            <span className="text-cyan-400">Execute</span>
            <br />
            {`New Ideas.`}
          </h2>
          <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Have a project in mind? Send me a git push request (or just a
            message).
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 sm:gap-6 justify-center lg:justify-start">
            <a
              href="mailto:sahilbhullar44@gmail.com"
              className="flex items-center gap-4 text-white/80 hover:text-cyan-400 transition-colors interactive group justify-center lg:justify-start"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors shrink-0">
                <Mail size={18} className="md:w-5 md:h-5" />
              </div>
              <span className="font-mono text-sm md:text-lg truncate">
                sahilbhullar44@gmail.com
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/sahilpreet-singh-3042b02a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-cyan-400 transition-colors interactive group justify-center lg:justify-start"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors shrink-0">
                <Linkedin size={18} className="md:w-5 md:h-5" />
              </div>
              <span className="font-mono text-sm md:text-lg">
                LinkedIn Profile
              </span>
            </a>
          </div>
        </div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="w-full bg-[#0d0d0d] rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-900/10 relative"
        >
          {/* Header */}
          <div className="bg-[#1a1a1a] px-3 md:px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-[10px] md:text-xs font-mono text-gray-500 flex items-center gap-2">
              <Terminal size={12} />
              contact.tsx
            </div>
            <div className="w-10"></div>
          </div>

          {/* Code Area */}
          <div className="p-4 sm:p-6 md:p-8 font-mono text-xs md:text-sm relative bg-[#0d0d0d]">
            {/* Line Numbers */}
            <div className="absolute left-2 sm:left-4 top-4 sm:top-6 bottom-4 w-6 flex flex-col gap-6 md:gap-[1.6rem] text-gray-700 text-right select-none pointer-events-none font-mono leading-relaxed pt-2 sm:pt-2">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="pl-6 sm:pl-8 space-y-4 md:space-y-6"
            >
              {/* Name Input */}
              <div className="group">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">sender</span>
                  <span className="text-white">=</span>
                  <span className="text-gray-400"></span>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 min-w-[120px] flex-1 interactive focus:ring-0 p-0 h-6"
                  />
                  <span className="text-gray-400">;</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="group">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">email</span>
                  <span className="text-white">=</span>
                  <span className="text-gray-400"></span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 min-w-[120px] flex-1 interactive focus:ring-0 p-0 h-6"
                  />
                  <span className="text-gray-400">;</span>
                </div>
              </div>

              {/* Message Input */}
              <div className="group">
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">function</span>
                    <span className="text-yellow-400">sendMessage</span>
                    <span className="text-white">() {"{"}</span>
                  </div>
                  <div className="pl-3 md:pl-4 flex items-start gap-1 md:gap-2">
                    <span className="text-purple-400 mt-0.5">return</span>
                    <span className="text-gray-400 mt-0.5">`</span>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Your message here..."
                      className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-700 w-full resize-none interactive focus:ring-0 p-0 leading-relaxed custom-scrollbar"
                      style={{ minHeight: "80px" }}
                    />
                    <span className="text-gray-400 mt-auto">`;</span>
                  </div>
                  <div className="text-white">{"}"}</div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 md:pt-4">
                <button
                  type={isSubmitted ? "button" : "submit"}
                  disabled={isSubmitting}
                  onClick={
                    isSubmitted ? () => setIsSubmitted(false) : undefined
                  }
                  className="group relative inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 rounded text-gray-300 hover:text-cyan-400 transition-all interactive w-full md:w-auto cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="text-xs md:text-sm">Compiling...</span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2 text-xs md:text-sm">
                      <span className="text-green-400">Deployed!</span>
                      <span className="text-gray-500 text-[10px] md:text-xs border-l border-gray-700 pl-2 ml-1">
                        Restart?
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs md:text-sm">
                      <span className="font-bold text-green-500 mr-1">$</span>
                      npm run send
                    </span>
                  )}
                </button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
