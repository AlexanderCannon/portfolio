"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  FaCode,
  FaCloud,
  FaBrain,
  FaRocket,
  FaChevronRight,
  FaTerminal,
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from 'react-icons/fa';
import EmailCaptureForm from '~/app/_components/forms/email-capture-form';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  const fullText = "Engineering Leader & Technology Innovator";

  useEffect(() => {
    if (isTyping) {
      if (typedText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    }
  }, [typedText, isTyping]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsSkillsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const technologies = [
    { name: 'TypeScript', level: 100 },
    { name: 'Python', level: 85 },
    { name: 'Rust', level: 90 },
    { name: 'React', level: 100 },
    { name: 'AWS', level: 100 },
    { name: 'AI/ML', level: 75 }
  ];

  const experiences = [
    {
      title: 'AI & LLM Solutions',
      icon: <FaBrain className="w-12 h-12 text-purple-600" />,
      description: 'Leading development of enterprise LLM-based AI tools and solutions.'
    },
    {
      title: 'Cloud Architecture',
      icon: <FaCloud className="w-12 h-12 text-purple-600" />,
      description: 'Expertise in AWS, Azure, and GCP, building scalable solutions.'
    },
    {
      title: 'Technical Leadership',
      icon: <FaRocket className="w-12 h-12 text-purple-600" />,
      description: 'Managing and mentoring engineering teams to deliver high-impact products.'
    },
    {
      title: 'Full-Stack Development',
      icon: <FaCode className="w-12 h-12 text-purple-600" />,
      description: 'Building complex applications with modern technology stacks.'
    }
  ];

  const terminalCommands = [
    { command: 'skills.list()', output: 'Rust, TypeScript, Python, Golang, React, AWS, AI/ML' },
    { command: 'experience.current()', output: 'CTO @ Zinguist' },
    { command: 'projects.latest()', output: 'Productivity tools for 10x devs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 dark:from-gray-900 to-gray-150 dark:to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Alexander Cannon</h1>
          <div className="h-8">
            <span className="text-xl text-purple-600">{typedText}</span>
            <span className={`inline-block w-2 h-6 ml-1 g-gradient-to-r from-primary to-purple-600 dark:from-blue-500 dark:to-purple-600 ${isTyping ? 'animate-pulse' : ''}`}></span>
          </div>
        </div>

        {/* Terminal Section */}
        <div className="max-w-2xl mx-auto mb-20 bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <FaTerminal className="w-4 h-4 mr-2" />
            <span className="text-sm">terminal</span>
          </div>
          <div className="p-4 font-mono text-sm">
            {terminalCommands.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center text-green-400">
                  <FaChevronRight className="w-4 h-4 mr-2" />
                  <span>{item.command}</span>
                </div>
                <div className="ml-6 mt-1 text-gray-300">{item.output}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-20" ref={skillsRef}>
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{tech.name}</span>
                  <span>{isSkillsVisible ? `${tech.level}%` : '0%'}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 rounded-full h-2 transition-all duration-1000 ease-out"
                    style={{
                      width: isSkillsVisible ? `${tech.level}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mb-20">
          <EmailCaptureForm />
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Areas of Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
                onMouseEnter={() => setActiveSection(index)}
              >
                <div className="flex items-center mb-4">
                  {exp.icon}
                  <h3 className="text-xl font-semibold ml-4">{exp.title}</h3>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-20">
          <div className="flex justify-center space-x-6">
            <a href="mailto:alexander@farpointlabs.com" className="hover:text-blue-400 transition-colors">
              <FaEnvelope className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaGithub className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;