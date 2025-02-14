"use client";

import { useState, useEffect } from 'react';
// import { api } from "~/utils/api";

const HeroSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // const signUpMutation = api.interest.signUp.useMutation();

  const [scrollY, setScrollY] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // signUpMutation.mutate({ email });
      setSubmitted(true);
    }
  };

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate ripple spacing based on scroll position for overlap effect
  const rippleSpacing = Math.max(-50, 200 - scrollY * 0.35);

  return (
    <section className="flex items-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-center py-20 px-6 text-white relative min-w-full overflow-hidden min-h-[500px]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/path-to-your-background-image.jpg)' }}></div>

      {/* Ripple Effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        <div
          className="absolute w-[700px] h-[700px] rounded-full border-[10px] border-accent opacity-40"
          style={{
            transform: `translateY(-${rippleSpacing}px)`,
          }}
        ></div>
        <div
          className="absolute w-[600px] h-[600px] rounded-full border-[10px] border-accent opacity-50"
          style={{
            transform: `translateY(-${rippleSpacing * 1.2}px)`,
          }}
        ></div>
        <div
          className="absolute w-[500px] h-[500px] rounded-full border-[10px] border-accent opacity-60"
          style={{
            transform: `translateY(-${rippleSpacing * 1.5}px)`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col h-full">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Empowering Businesses with Cutting-Edge AI Solutions
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Innovative AI consulting to transform your business
        </p>

        {/* Email Capture Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full sm:w-auto p-3 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
            >
              Request a free Consultation
            </button>
          </form>
        ) : (
          <p className="text-green-200 mt-4">Thank you for contacting us! We&apos;ll be in touch soon.</p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
