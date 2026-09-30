import React from "react";
import resumeData from "public/resume.json";

const Timeline = () => {
  return (
    <div className="relative max-w-3xl">
      <div className="absolute left-[0.4rem] top-2 h-[calc(100%-1rem)] w-px bg-line" />

      <ol className="space-y-10">
        {resumeData.experience.map((exp, index) => (
          <li key={`${exp.company}-${index}`} className="relative pl-10">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-sm border-2 border-accent bg-paper" />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {exp.company}
              </h3>
              <span className="text-sm text-ink-muted">{exp.period}</span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {exp.title}
              <span className="mx-2 text-line">·</span>
              {exp.location}
            </p>

            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-muted">
              {exp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm leading-relaxed text-ink">
              {exp.technologies.join(" · ")}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
