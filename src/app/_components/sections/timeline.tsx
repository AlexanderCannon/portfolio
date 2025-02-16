import React from 'react';
import { FaBriefcase, FaChevronRight } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '~/app/_components/ui/card';

import resumeData from 'public/resume.json';

const Timeline = () => {
  // Sample resume data

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Professional Timeline
        </CardTitle>
        <div className="text-sm text-gray-500">
          {resumeData.personalInfo.name} | {resumeData.personalInfo.location}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200" />

          {/* Timeline items */}
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-7 -translate-x-1/2 bg-white">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500 bg-white">
                    <FaBriefcase className="h-4 w-4 text-blue-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{exp.company}</h3>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">{exp.title}</span>
                      <FaChevronRight className="h-4 w-4 mx-2" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-2">
                      <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mt-3">
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;