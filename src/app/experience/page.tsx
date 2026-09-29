"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "~/app/_components/ui/page-shell";
import Timeline from "~/app/_components/sections/timeline";

const resumeData = {
  personalInfo: {
    name: "Alexander Cannon",
    email: "alexander@farpointlabs.com",
  },
  skills: {
    programmingLanguages: [
      "Rust",
      "Python",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Golang",
      "C",
      "C++",
      "COBOL",
    ],
    cloudPlatforms: ["AWS", "Azure", "Google Cloud"],
    frameworks: [
      "React",
      "React Native",
      "Flutter",
      "Django",
      "Express.js",
      "Next.js",
      "GraphQL",
      "FastAPI",
      "Gin",
    ],
    databases: [
      "PostgreSQL",
      "MongoDB",
      "DynamoDB",
      "Redis",
      "Elasticsearch",
      "Kafka",
    ],
    devOps: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "ELK Stack",
    ],
    ai_ml: [
      "OpenAI API",
      "LangChain",
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "scikit-learn",
      "Pandas",
      "NumPy",
    ],
    blockchain: [
      "Ethereum",
      "Solidity",
      "Web3.js",
      "Hardhat",
      "Smart Contracts",
      "DeFi",
      "NFTs",
      "MetaMask",
    ],
    softSkills: [
      "Performance Management",
      "Team Leadership",
      "Conflict Resolution",
      "Communication Skills",
      "Problem-Solving",
      "Team Building",
      "Agile Management",
      "Technical Architecture",
      "Product Strategy",
    ],
    tools: [
      "Git",
      "Jira",
      "Confluence",
      "VS Code",
      "Postman",
      "Linux",
      "CI/CD",
      "AWS CDK",
      "Serverless Framework",
    ],
  },
};

const skillGroups: Array<{ label: string; items: string[] }> = [
  { label: "Languages", items: resumeData.skills.programmingLanguages },
  { label: "Frameworks", items: resumeData.skills.frameworks },
  { label: "Data", items: resumeData.skills.databases },
  { label: "DevOps", items: resumeData.skills.devOps },
  { label: "AI / ML", items: resumeData.skills.ai_ml },
  { label: "Web3", items: resumeData.skills.blockchain },
  { label: "Leadership", items: resumeData.skills.softSkills },
  { label: "Tools", items: resumeData.skills.tools },
  { label: "Cloud", items: resumeData.skills.cloudPlatforms },
];

export default function ExperiencePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return skillGroups;
    return skillGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchTerm]);

  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Experience
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Professional experience
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          {resumeData.personalInfo.name} · a decade-plus of shipping software
          and leading teams.
        </p>
      </header>

      <div className="mt-10 grid gap-4 border-y border-line py-6 text-sm sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ink">10+</p>
          <p className="text-ink-muted">years building</p>
        </div>
        <div>
          <p className="font-display text-2xl text-ink">
            {resumeData.skills.programmingLanguages.length}
          </p>
          <p className="text-ink-muted">languages in the kit</p>
        </div>
        <div>
          <p className="font-display text-2xl text-ink">
            {resumeData.skills.cloudPlatforms.length}
          </p>
          <p className="text-ink-muted">major clouds</p>
        </div>
      </div>

      <div className="mt-10">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Filter skills</span>
          <input
            type="search"
            placeholder="Search skills or technologies…"
            className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <section className="mt-12 space-y-8">
        <h2 className="font-display text-3xl text-ink">Skills</h2>
        {filteredGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
              {group.label}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-ink">
              {group.items.join(" · ")}
            </p>
          </div>
        ))}
      </section>

      <p className="mt-10 text-sm text-ink-muted">
        Prefer raw data?{" "}
        <Link
          href="/resume.json"
          target="_blank"
          className="text-accent hover:underline"
        >
          Download resume.json
        </Link>
      </p>

      <section className="mt-16 border-t border-line pt-12">
        <h2 className="mb-8 font-display text-3xl text-ink">Timeline</h2>
        <Timeline />
      </section>
    </PageShell>
  );
}
