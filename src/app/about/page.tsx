"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { FaCommentAlt, FaGithub, FaLinkedin, FaGuitar, FaRunning, FaMountain, FaBookReader, FaBiking } from 'react-icons/fa';
import { MdTravelExplore } from 'react-icons/md';

const AboutPage = () => {
  const [activeHobby, setActiveHobby] = useState<number | null>(null);

  const hobbies = [
    { icon: FaGuitar, name: 'Guitar', description: 'Finding peace in music and constantly learning new songs', image: "/images/guitar.png" },
    { icon: FaRunning, name: 'Jogging', description: 'Early morning runs to start the day right', image: "/images/running.png" },
    { icon: FaMountain, name: 'Hiking', description: 'Exploring trails and finding new perspectives', image: "/images/hiking.png" },
    { icon: MdTravelExplore, name: 'Traveling', description: 'Discovering new cultures and places', image: "/images/travel.png" },
    { icon: FaBookReader, name: 'Reading', description: 'Expanding horizons through books', image: "/images/reading.png" },
    { icon: FaBiking, name: 'Cycling', description: 'Adventures on my bike', image: "/images/cycling.png" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
        <h1 className="text-4xl font-bold mb-4 animate-fade-in">Alexander Cannon</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Engineering Leader, Founder & Technology Innovator</p>
        <div className="flex justify-center gap-4">
          <a href="mailto:alexander@farpointlabs.com" className="flex items-center gap-2 text-purple-600 hover:text-blue-800 transition-colors duration-300">
            <FaCommentAlt size={20} />
            <span>Email</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-purple-600 hover:text-blue-800 transition-colors duration-300">
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-purple-600 hover:text-blue-800 transition-colors duration-300">
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              I&apos;m an engineering leader and founder who thrives on building innovative technology solutions. With extensive experience in video streaming platforms, blockchain technologies, and AI/ML applications, I&apos;ve led teams to deliver high-impact products across various industries. Currently, I&apos;m focused on developing LLM-based AI tools and managing enterprise-level AI solutions at Kellog, Brown & Root.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg h-64">
            <Image
              width={600}
              height={400}
              src="/images/working.png"
              alt="Alexander working"
              className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm">Building the future, one line of code at a time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="mb-12 relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
        <div className="pl-6">
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg mb-6 transform hover:scale-102 transition-transform duration-300">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              My story in technology began before I could even ride a bicycle. While most kids were learning to balance on two wheels, I was diving into the world of coding, laying the foundation for what would become my life&apos;s passion. Ironically, I later discovered a love for cycling and now proudly own a folding bike that accompanies me on many adventures.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At 14, my journey took an unexpected turn when I suffered a severe injury that threatened to derail everything. But what could have been a setback became a catalyst for growth. Through determination and resilience, I not only recovered but emerged stronger, with a deepened understanding of perseverance that would later prove invaluable in my entrepreneurial journey.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Core Technologies</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {[
                'TypeScript & JavaScript Ecosystem',
                'Golang & Python Development',
                'Cloud Platforms (AWS, Azure, GCP)',
                'Blockchain & Smart Contracts',
                'AI/ML & LLM Integration'
              ].map((tech, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Leadership Skills</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {[
                'Team Building & Mentorship',
                'Technical Architecture Design',
                'Agile Project Management',
                'Cross-functional Collaboration',
                'Performance Management'
              ].map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Notable Projects Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Notable Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Enterprise AI Solutions',
              description: 'Led the development of LLM-based AI tools for enterprise applications, focusing on scalability and performance optimization.',
              gradient: 'from-purple-500 to-blue-500'
            },
            {
              title: 'Fintech Innovation',
              description: 'Founded and launched a regulated fintech application, implementing complex financial systems and obtaining banking licenses.',
              gradient: 'from-blue-500 to-purple-500'
            },
            {
              title: 'Streaming Platform',
              description: "Developed Discovery Network's first online streaming platform, supporting live Olympic events for millions of viewers.",
              gradient: 'from-purple-500 to-blue-500'
            },
            {
              title: 'Blockchain Development',
              description: 'Created multiple crypto tokens and ICOs, building surrounding web applications with modern tech stacks.',
              gradient: 'from-blue-500 to-purple-500'
            }
          ].map((project, _index) => (
            <div
              key={project.title}
              className={`bg-gradient-to-r ${project.gradient} p-6 rounded-lg text-white transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-100">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Life Beyond Code</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {hobbies.map((hobby, index) => (
            <div
              key={hobby.name}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveHobby(index)}
              onMouseLeave={() => setActiveHobby(null)}
            >
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <Image
                  width={260}
                  height={260}
                  src={hobby.image}
                  alt={hobby.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent 
                             group-hover:from-purple-900/70 group-hover:via-purple-800/50 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <hobby.icon size={activeHobby === index ? 48 : 32} className="transition-all duration-300" />
                  <h3 className="text-lg font-semibold mt-2">{hobby.name}</h3>
                  <p className="text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {hobby.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;