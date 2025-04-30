"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '~/app/_components/ui/card';
import { BriefcaseIcon, BookIcon, AwardIcon, SearchIcon } from 'lucide-react';
import Timeline from '~/app/_components/sections/timeline';
import Link from 'next/link';

const ExperiencePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const resumeData = {
    personalInfo: {
      name: "Alexander Cannon",
      location: "Beverly Hills, CA 90210",
      phone: "+1 840 233 2754",
      email: "alexander@farpointlabs.com",
    },
    skills: {
      programmingLanguages: [
        "Rust", "Python", "TypeScript", "Node.js", "JavaScript",
        "Golang", "C", "C++", "COBOL"
      ],
      cloudPlatforms: ["AWS", "Azure", "Google Cloud"],
      frameworks: [
        "React", "React Native", "Flutter", "Django", "Express.js",
        "Next.js", "GraphQL", "FastAPI", "Gin"
      ],
      databases: [
        "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Elasticsearch",
        "Kafka"
      ],
      devOps: [
        "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions",
        "ArgoCD", "Prometheus", "Grafana", "ELK Stack"
      ],
      ai_ml: [
        "OpenAI API", "LangChain", "PyTorch", "TensorFlow",
        "Hugging Face", "scikit-learn", "Pandas", "NumPy"
      ],
      blockchain: [
        "Ethereum", "Solidity", "Web3.js", "Hardhat",
        "Smart Contracts", "DeFi", "NFTs", "MetaMask"
      ],
      softSkills: [
        "Performance Management", "Team Leadership",
        "Conflict Resolution", "Communication Skills",
        "Problem-Solving", "Team Building", "Agile Management",
        "Technical Architecture", "Product Strategy"
      ],
      tools: [
        "Git", "Jira", "Confluence", "VS Code", "Postman",
        "Linux", "CI/CD", "AWS CDK", "Serverless Framework"
      ]
    }
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Professional Experience
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {resumeData.personalInfo.name} | {resumeData.personalInfo.location}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">10+ Years</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Professional Experience</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <BookIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {resumeData.skills.programmingLanguages.length} Languages
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Programming Expertise</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="flex items-center p-6">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <AwardIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {resumeData.skills.cloudPlatforms.length} Platforms
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cloud Technologies</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search experiences, skills, or technologies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Skills Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
            <div className="space-y-6">
              {/* Programming Languages */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.programmingLanguages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frameworks.map((framework, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              {/* Databases */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Databases & Message Queues
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.databases.map((db, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                      {db}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  DevOps & Infrastructure
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.devOps.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI/ML */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  AI & Machine Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.ai_ml.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blockchain */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Blockchain & Web3
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.blockchain.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Leadership & Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.softSkills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.tools.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardHeader>Would you like the raw data?</CardHeader>
          <CardContent>
            <p>You can download the JSON for my experience at <Link href="/resume.json" target='_blank'>/resume.json</Link></p>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        {/* <SplitTimeline /> */}
        <Timeline />
      </div>
    </div >
  );
};

export default ExperiencePage;