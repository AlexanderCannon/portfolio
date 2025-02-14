import React from 'react';
import Image from 'next/image';

// Company data with specific system font classes for each name
const companies = [
  { id: 1, name: 'NexTech Innovations', logo: '/logos/1.svg', fontClass: 'font-sans' },
  { id: 2, name: 'Quantum Insights', logo: '/logos/2.svg', fontClass: 'font-serif' },
  { id: 3, name: 'Pioneer Analytics', logo: '/logos/3.svg', fontClass: 'font-mono' },
  { id: 4, name: 'Apex Solutions', logo: '/logos/4.svg', fontClass: 'font-rounded' },
  { id: 5, name: 'BlueWave Systems', logo: '/logos/5.svg', fontClass: 'font-sans' },
  { id: 6, name: 'Vertex Intelligence', logo: '/logos/6.svg', fontClass: 'font-serif' },
  { id: 7, name: 'Catalyst Dynamics', logo: '/logos/7.svg', fontClass: 'font-mono' },
  { id: 8, name: 'Stratosphere AI', logo: '/logos/8.svg', fontClass: 'font-rounded' },
  { id: 9, name: 'Optima Tech Labs', logo: '/logos/9.svg', fontClass: 'font-sans' },
  { id: 10, name: 'Luminex Digital', logo: '/logos/10.svg', fontClass: 'font-serif' },
];

const ClientLogosSection: React.FC = () => {
  return (
    <section className="bg-background py-16 px-4 max-w-full min-w-full">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-text text-center mb-8">
        Trusted by Leading Brands
      </h2>

      {/* Scrolling Carousel */}
      <div className="flex overflow-x-auto space-x-8 px-4">
        {companies.map((company) => (
          <div key={company.id} className="flex-shrink-0 text-center">
            {/* Logo */}
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={24}
              height={24}
              className="w-24 h-24 object-contain mx-auto grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            />
            {/* Company Name with Assigned System Font */}
            <p className={`text-secondary text-sm mt-2 ${company.fontClass}`}>
              {company.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogosSection;
