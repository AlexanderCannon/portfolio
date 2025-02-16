import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/app/_components/ui/card';
import { BriefcaseIcon, ChevronRightIcon } from 'lucide-react';

import resumeData from 'public/resume.json';

interface Experience {
  year: number;
  company: string;
  title: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

const SplitTimeline = () => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const timelineRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleDivRef = (year: number) => (el: HTMLDivElement | null) => {
    timelineRefs.current[year] = el;
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    resumeData.experience.forEach((exp) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              setActiveYear(exp.year);
              setActiveExperience(exp);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-50% 0px -50% 0px"
        }
      );

      const element = timelineRefs.current[exp.year];
      if (element) {
        observer.observe(element);
      }
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Timeline Section */}
          <div className="w-2/3 py-8">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200" />

              {/* Timeline items */}
              <div className="space-y-12">
                {resumeData.experience.map((exp) => (
                  <div
                    key={exp.year}
                    ref={handleDivRef(exp.year)}
                    className="relative pl-16"
                  >
                    {/* Year marker */}
                    <div className="absolute left-7 -translate-x-1/2 bg-white">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 
                        ${activeYear === exp.year ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
                        <span className="text-sm font-medium">{exp.year}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`rounded-lg border p-4 transition-all duration-300
                      ${activeYear === exp.year ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{exp.company}</h3>
                          <span className="text-sm text-gray-500">{exp.period}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="font-medium">{exp.title}</span>
                          <ChevronRightIcon className="h-4 w-4 mx-2" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Details Card */}
          <div className="w-1/3 py-8">
            <div className="sticky top-8">
              <Card className={`transition-all duration-300 ${activeExperience ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {activeExperience?.company}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{activeExperience?.period}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeExperience?.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeExperience?.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitTimeline;