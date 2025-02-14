import React from 'react';
import { FaCommentAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Alexander Cannon</h1>
        <p className="text-xl text-gray-600 mb-6">Engineering Leader & Technology Innovator</p>
        <div className="flex justify-center gap-4">
          <a href="mailto:a.m.t.cannon@gmail.com" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FaCommentAlt size={20} />
            <span>Email</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 mb-4">
          I&apos;m an engineering leader with a passion for building innovative technology solutions. With extensive experience in video streaming platforms, blockchain technologies, and AI/ML applications, I&apos;ve led teams to deliver high-impact products across various industries. Currently, I&apos;m focused on developing LLM-based AI tools and managing enterprise-level AI solutions at Kellog, Brown & Root.
        </p>
        <p className="text-gray-700 mb-4">
          Throughout my career, I&apos;ve founded multiple successful ventures, including Winston App, a regulated fintech application, and Farpoint Labs, a DevOps consultancy. I have a proven track record of building and leading engineering teams, setting technical standards, and driving innovation.
        </p>
      </section>

      {/* Expertise Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Core Technologies</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>TypeScript & JavaScript Ecosystem</li>
              <li>Golang & Python Development</li>
              <li>Cloud Platforms (AWS, Azure, GCP)</li>
              <li>Blockchain & Smart Contracts</li>
              <li>AI/ML & LLM Integration</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Leadership Skills</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Team Building & Mentorship</li>
              <li>Technical Architecture Design</li>
              <li>Agile Project Management</li>
              <li>Cross-functional Collaboration</li>
              <li>Performance Management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Notable Projects Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Notable Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Enterprise AI Solutions</h3>
            <p className="text-gray-700">Led the development of LLM-based AI tools for enterprise applications, focusing on scalability and performance optimization.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Fintech Innovation</h3>
            <p className="text-gray-700">Founded and launched a regulated fintech application, implementing complex financial systems and obtaining banking licenses.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Streaming Platform</h3>
            <p className="text-gray-700">Developed Discovery Network&apos;s first online streaming platform, supporting live Olympic events for millions of viewers.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Blockchain Development</h3>
            <p className="text-gray-700">Created multiple crypto tokens and ICOs, building surrounding web applications with modern tech stacks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;