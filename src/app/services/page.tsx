"use client";

import React, { useState } from 'react';
import { CardHeader, CardTitle, CardContent, Card } from '~/app/_components/ui/card';
import { BrainCircuit, Code, Database, Cloud, Workflow, Blocks, Building2, LineChart } from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}


interface Service {
  id: string;
  icon: React.FC<IconProps>;
  title: string;
  shortDesc: string;
  longDesc: string;
  offerings: string[];
  technologies: string[];
}

const ServicesPage = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  // const timelineRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const services: Array<Service> = [
    {
      id: 'ai-ml',
      icon: BrainCircuit,
      title: 'AI & ML Solutions',
      shortDesc: 'Enterprise-grade AI solutions and LLM integrations',
      longDesc: 'Specialized in developing and deploying large language models and AI solutions for enterprise use cases. From custom LLM implementations to AI-powered automation tools.',
      offerings: [
        'LLM Integration & Deployment',
        'Custom AI Model Development',
        'Enterprise AI Strategy',
        'AI Ethics & Governance',
        'MLOps & Model Monitoring'
      ],
      technologies: ['OpenAI', 'Azure ML', 'LangChain', 'PyTorch', 'TensorFlow']
    },
    {
      id: 'engineering-leadership',
      icon: Building2,
      title: 'Engineering Leadership',
      shortDesc: 'Strategic technical leadership and team management',
      longDesc: 'Experienced in building and leading high-performing engineering teams. Focus on technical excellence, team development, and delivering business value.',
      offerings: [
        'Technical Team Leadership',
        'Engineering Strategy',
        'Performance Management',
        'Agile Implementation',
        'Technical Mentorship'
      ],
      technologies: ['Agile', 'JIRA', 'Confluence', 'GitHub', 'Technical Architecture']
    },
    {
      id: 'blockchain',
      icon: Blocks,
      title: 'Blockchain Development',
      shortDesc: 'Web3 solutions and blockchain integration',
      longDesc: 'Expert in blockchain technologies, smart contract development, and Web3 applications. Experience with multiple blockchain platforms and DeFi solutions.',
      offerings: [
        'Smart Contract Development',
        'DeFi Applications',
        'Token Creation & ICOs',
        'Web3 Integration',
        'Blockchain Architecture'
      ],
      technologies: ['Ethereum', 'Solidity', 'Web3.js', 'Smart Contracts', 'DeFi']
    },
    {
      id: 'cloud-architecture',
      icon: Cloud,
      title: 'Cloud Architecture',
      shortDesc: 'Scalable cloud solutions and infrastructure design',
      longDesc: 'Design and implementation of scalable cloud architectures across major platforms. Focus on performance, security, and cost optimization.',
      offerings: [
        'Cloud Migration Strategy',
        'Infrastructure as Code',
        'Microservices Architecture',
        'Cloud Cost Optimization',
        'Multi-Cloud Solutions'
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform']
    },
    {
      id: 'full-stack',
      icon: Code,
      title: 'Full Stack Development',
      shortDesc: 'End-to-end application development',
      longDesc: 'Comprehensive full-stack development services using modern technologies and best practices. From web applications to mobile solutions.',
      offerings: [
        'Web Application Development',
        'Mobile App Development',
        'API Design & Development',
        'Frontend Architecture',
        'Backend Systems'
      ],
      technologies: ['React', 'Node.js', 'Python', 'TypeScript', 'GraphQL']
    },
    {
      id: 'data-engineering',
      icon: Database,
      title: 'Data Engineering',
      shortDesc: 'Data pipeline and analytics infrastructure',
      longDesc: 'Building robust data pipelines and analytics infrastructure. Experience with big data processing and real-time analytics systems.',
      offerings: [
        'Data Pipeline Development',
        'ETL Process Design',
        'Data Warehouse Solutions',
        'Real-time Analytics',
        'Data Architecture'
      ],
      technologies: ['PostgreSQL', 'MongoDB', 'Kafka', 'Elasticsearch', 'Redis']
    },
    {
      id: 'devops',
      icon: Workflow,
      title: 'DevOps & CI/CD',
      shortDesc: 'Automated deployment and infrastructure management',
      longDesc: 'Implementation of DevOps practices and CI/CD pipelines. Focus on automation, monitoring, and infrastructure management.',
      offerings: [
        'CI/CD Pipeline Setup',
        'Container Orchestration',
        'Infrastructure Automation',
        'Monitoring & Logging',
        'Security Integration'
      ],
      technologies: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'ArgoCD']
    },
    {
      id: 'technical-strategy',
      icon: LineChart,
      title: 'Technical Strategy',
      shortDesc: 'Strategic technology planning and implementation',
      longDesc: 'Strategic technology planning and roadmap development. Focus on aligning technical solutions with business objectives.',
      offerings: [
        'Technology Roadmap Development',
        'Technical Due Diligence',
        'Architecture Review',
        'Innovation Strategy',
        'Technical Risk Assessment'
      ],
      technologies: ['Enterprise Architecture', 'Technical Documentation', 'Risk Analysis', 'Strategic Planning']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions and leadership services backed by years of industry experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg
                ${activeService === service.id ? 'ring-2 ring-purple-600' : ''}
              `}
              onClick={() => setActiveService(service.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <service.icon className="h-6 w-6 text-purple-600" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.shortDesc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Service View */}
        {activeService && (
          <Card className="w-full max-w-4xl mx-auto mb-16 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3">
                {(() => {
                  const activeSvc = services.find((s) => s.id === activeService);
                  const ActiveIcon = activeSvc?.icon;
                  return (
                    <>
                      {ActiveIcon && <ActiveIcon className="h-8 w-8 text-purple-600" />}
                    </>
                  );
                })()}
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {services.find(s => s.id === activeService)?.title}
                  </CardTitle>
                  <p className="text-gray-600">
                    {services.find(s => s.id === activeService)?.longDesc}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Service Offerings */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Service Offerings</h3>
                  <ul className="space-y-2">
                    {services.find(s => s.id === activeService)?.offerings.map((offering, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                        <span className="text-gray-700">{offering}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {services.find(s => s.id === activeService)?.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;