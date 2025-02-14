import Image from 'next/image';
import React from 'react';

// Define testimonials data with logo paths
const testimonials = [
  {
    id: 1,
    quote: "Alexander transformed our data strategy, unlocking insights we didn't know were possible.",
    name: 'Jane Doe',
    position: 'Chief Data Officer',
    logoPath: '/logos/1.svg',
    caseStudyLink: '/case-studies/data-strategy',
  },
  {
    id: 2,
    quote: "Our machine learning models are now more accurate than ever, thanks to their expertise.",
    name: 'John Smith',
    position: 'Head of Analytics',
    logoPath: '/logos/2.svg',
    caseStudyLink: '/case-studies/machine-learning',
  },
  {
    id: 3,
    quote: "Incredible service! They seamlessly integrated AI into our systems with minimal disruption.",
    name: 'Emily Zhang',
    position: 'CTO',
    logoPath: '/logos/3.svg',
    caseStudyLink: '/case-studies/ai-integration',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-background py-16 px-4 min-w-full">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center text-text mb-10">What Our Clients Say</h2>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white shadow-lg rounded-lg p-6 text-center">
            {/* Client Logo */}
            {testimonial.logoPath && (
              <Image
                width={64}
                height={64}
                src={testimonial.logoPath}
                alt={`${testimonial.name} logo`}
                className="w-16 h-16 mx-auto mb-4 object-contain"
              />
            )}

            {/* Quote */}
            <p className="text-secondary italic mb-4">&quot;{testimonial.quote}&quot;</p>

            {/* Client Name and Position */}
            <div className="text-primary font-semibold">
              <p>{testimonial.name}</p>
              <p className="text-sm text-secondary">{testimonial.position}</p>
            </div>

            {/* Case Study Link */}
            {testimonial.caseStudyLink && (
              <a
                href={testimonial.caseStudyLink}
                className="text-accent font-medium mt-4 inline-block hover:text-green-600"
              >
                Read Case Study →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
