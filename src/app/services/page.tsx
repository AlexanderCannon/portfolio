"use client";

import React, { useState } from "react";
import PageShell from "~/app/_components/ui/page-shell";
import {
  BrainCircuit,
  Code,
  Database,
  Cloud,
  Workflow,
  Blocks,
  Building2,
  LineChart,
} from "lucide-react";

interface Service {
  id: string;
  icon: React.FC<{ className?: string }>;
  title: string;
  shortDesc: string;
  longDesc: string;
  offerings: string[];
  technologies: string[];
}

const services: Service[] = [
  {
    id: "ai-ml",
    icon: BrainCircuit,
    title: "AI & ML Solutions",
    shortDesc: "Enterprise AI and LLM integrations that ship.",
    longDesc:
      "Developing and deploying language models and AI systems for real enterprise use — strategy through monitoring.",
    offerings: [
      "LLM integration & deployment",
      "Custom AI model development",
      "Enterprise AI strategy",
      "AI ethics & governance",
      "MLOps & model monitoring",
    ],
    technologies: ["OpenAI", "Azure ML", "LangChain", "PyTorch", "TensorFlow"],
  },
  {
    id: "engineering-leadership",
    icon: Building2,
    title: "Engineering Leadership",
    shortDesc: "Teams, architecture, and delivery that hold up.",
    longDesc:
      "Building and leading engineering organizations — technical excellence, mentorship, and shipping business value.",
    offerings: [
      "Technical team leadership",
      "Engineering strategy",
      "Performance management",
      "Agile implementation",
      "Technical mentorship",
    ],
    technologies: ["Agile", "JIRA", "Confluence", "GitHub", "Architecture"],
  },
  {
    id: "blockchain",
    icon: Blocks,
    title: "Blockchain Development",
    shortDesc: "Web3 products and smart contracts.",
    longDesc:
      "Smart contracts, DeFi, and Web3 apps across platforms — with the boring security work included.",
    offerings: [
      "Smart contract development",
      "DeFi applications",
      "Token creation",
      "Web3 integration",
      "Blockchain architecture",
    ],
    technologies: ["Ethereum", "Solidity", "Web3.js", "Hardhat", "DeFi"],
  },
  {
    id: "cloud-architecture",
    icon: Cloud,
    title: "Cloud Architecture",
    shortDesc: "Scalable infrastructure, sane costs.",
    longDesc:
      "Cloud design across AWS, Azure, and GCP — performance, security, and cost in the same conversation.",
    offerings: [
      "Cloud migration strategy",
      "Infrastructure as code",
      "Microservices architecture",
      "Cost optimization",
      "Multi-cloud solutions",
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"],
  },
  {
    id: "full-stack",
    icon: Code,
    title: "Full Stack Development",
    shortDesc: "End-to-end product engineering.",
    longDesc:
      "Web and mobile products with modern stacks — APIs, clients, and the glue between them.",
    offerings: [
      "Web application development",
      "Mobile app development",
      "API design",
      "Frontend architecture",
      "Backend systems",
    ],
    technologies: ["React", "Node.js", "Python", "TypeScript", "GraphQL"],
  },
  {
    id: "data-engineering",
    icon: Database,
    title: "Data Engineering",
    shortDesc: "Pipelines and analytics that stay trusted.",
    longDesc:
      "Data pipelines, warehouses, and real-time analytics — built to be operated, not just demoed.",
    offerings: [
      "Data pipeline development",
      "ETL design",
      "Data warehouse solutions",
      "Real-time analytics",
      "Data architecture",
    ],
    technologies: ["PostgreSQL", "MongoDB", "Kafka", "Elasticsearch", "Redis"],
  },
  {
    id: "devops",
    icon: Workflow,
    title: "DevOps & CI/CD",
    shortDesc: "Automation you can sleep through.",
    longDesc:
      "CI/CD, containers, monitoring — so releases are routine instead of heroic.",
    offerings: [
      "CI/CD pipeline setup",
      "Container orchestration",
      "Infrastructure automation",
      "Monitoring & logging",
      "Security integration",
    ],
    technologies: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "ArgoCD"],
  },
  {
    id: "technical-strategy",
    icon: LineChart,
    title: "Technical Strategy",
    shortDesc: "Roadmaps that match the business.",
    longDesc:
      "Technology planning, diligence, and architecture review aligned to real constraints.",
    offerings: [
      "Technology roadmaps",
      "Technical due diligence",
      "Architecture review",
      "Innovation strategy",
      "Risk assessment",
    ],
    technologies: [
      "Enterprise architecture",
      "Documentation",
      "Risk analysis",
      "Planning",
    ],
  },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>(services[0]!.id);
  const active = services.find((s) => s.id === activeId)!;

  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Services
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          How I can help
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Hands-on engineering, leadership, and strategy — pick a lane or bring
          the messy problem.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setActiveId(service.id)}
              className={`shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeId === service.id
                  ? "bg-accent-soft text-ink"
                  : "text-ink-muted hover:bg-secondary hover:text-ink"
              }`}
            >
              {service.title}
            </button>
          ))}
        </nav>

        <article className="border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex items-start gap-3">
            <active.icon className="mt-1 h-6 w-6 text-accent" />
            <div>
              <h2 className="font-display text-3xl text-ink">{active.title}</h2>
              <p className="mt-3 max-w-measure text-base leading-relaxed text-ink-muted">
                {active.longDesc}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Offerings
              </h3>
              <ul className="mt-3 space-y-2 text-ink">
                {active.offerings.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Tools
              </h3>
              <p className="mt-3 leading-relaxed text-ink">
                {active.technologies.join(" · ")}
              </p>
            </div>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
