'use client';
import React, { useState, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Search,
} from 'lucide-react';
import Image from 'next/image';

// Sample project data - you can replace this with your actual projects
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS. Features interactive elements and smooth animations.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: "/images/portfolio.png",
    github: "https://github.com/alexandercannon/portfolio",
    live: "https://www.alexandercannon.dev",
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Koi CD",
    description: "A concourse-as-a-service CI/CD platform that enables developers to automate their software delivery pipelines.",
    tags: ["Golang", "Concourse", "Sqlite", "Docker", "Command Line"],
    image: "/images/koi-cd.png",
    github: "https://github.com/farpointlabs/koi-cd",
    live: "http://farpointlabs.com",
    category: "Developer Tools"
  },
  {
    id: 3,
    title: "Plannet.dev",
    description: "An LLM powered command line tool that generates and manages ticketing systems for software projects.",
    tags: ["Golang", "LLM", "Command Line", "Jira", "Slack"],
    image: "/images/plannet.png",
    github: "https://github.com/plannet-ai/plannet",
    live: "https://www.plannet.dev/",
    category: "Machine Learning"
  },
  {
    id: 4,
    title: "Guitar Visualizer",
    description: "A mobile app for learning guitar chords and scales. Features a real-time visualizer notes.",
    tags: ["React Native", "Expo", "Redux", "Firebase", "Music Theory"],
    image: "/images/guitar-visualiser.png",
    github: "https://github.com/alexandercannon/guitarvisualizer",
    live: "https://guitarvisualizer.com",
    category: "Mobile"
  },
  {
    id: 5,
    title: "Infraedge",
    description: "A cloud infrastructure management tool that helps teams visualize and manage their cloud resources.",
    tags: ["Golang", "AWS", "Graph", "IAC"],
    image: "/images/infraedge.png",
    github: "https://github.com/alexandercannon/infraedge",
    live: "https://www.infraedge.dev",
    category: "Developer Tools"
  },
  {
    id: 6,
    title: "Scratcher",
    description: "A blockchain-based digital publishing platform that enables creators to monetize their content across the internet.",
    tags: ["React", "Solidity", "Ethereum", "IPFS", "Web3"],
    image: "/images/scratcher.png",
    github: "https://github.com/alexandercannon/scratcher",
    live: "https://www.scratcher.zone",
    category: "Full Stack"
  },
  {
    id: 7,
    title: "Eurovision Party",
    description: "A real-time voting app for Eurovision parties. Features live results, party voting, and a leaderboard.",
    tags: ["React Native", "Supabase", "Websockets", "Music"],
    image: "/images/eurovision-party.png",
    github: "https://github.com/alexandercannon/eurovision.fun",
    live: "https://www.eurovision.fun",
    category: "Mobile"
  }
];

const categories = ["All", "Full Stack", "Developer Tools", "Machine Learning", "Mobile"];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Filter projects based on category and search query
  useEffect(() => {
    let filtered = projectsData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore my latest projects and experiments. Each project represents a unique challenge and learning experience.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category
                  ? 'bg-primary text-white shadow-md hover:bg-primary-600 dark:bg-purple-600 dark:text-white dark:hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-blue-400 dark:text-gray-300"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Project Image */}
            <div className="relative">
              <Image
                width={600}
                height={600}
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover object-top"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-gray-900 hover:text-primary transition-colors duration-200"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-full text-gray-900 hover:text-primary transition-colors duration-200"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-purple-600 text-gray-600 dark:text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {
        filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )
      }
    </div >
  );
};

export default ProjectsPage;