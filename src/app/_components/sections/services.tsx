import Link from 'next/link';
import React from 'react';
import { FaRobot, FaChartLine, FaCogs, FaDatabase } from 'react-icons/fa'; // Example icons from react-icons

// Define the services data
const services = [
  {
    id: 1,
    name: 'Machine Learning Models',
    description: 'Develop predictive models tailored to your data.',
    icon: <FaRobot className="text-primary text-4xl mx-auto mb-4" />,
    link: '/services/machine-learning-models',
  },
  {
    id: 2,
    name: 'Data Strategy',
    description: 'Plan and execute a data-driven strategy for your business.',
    icon: <FaChartLine className="text-primary text-4xl mx-auto mb-4" />,
    link: '/services/data-strategy',
  },
  {
    id: 3,
    name: 'AI Integration',
    description: 'Seamlessly integrate AI solutions into existing systems.',
    icon: <FaCogs className="text-primary text-4xl mx-auto mb-4" />,
    link: '/services/ai-integration',
  },
  {
    id: 4,
    name: 'Data Management',
    description: 'Efficient data storage and retrieval for optimal performance.',
    icon: <FaDatabase className="text-primary text-4xl mx-auto mb-4" />,
    link: '/services/data-management',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-background py-16 px-4 min-w-full">
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center text-text mb-10">Our Services</h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
            <Link href={service.link} passHref>
              {/* Icon */}
              {service.icon}

              {/* Service Name */}
              <h3 className="text-xl font-semibold text-primary mb-2">{service.name}</h3>

              {/* Service Description */}
              <p className="text-secondary mb-4">{service.description}</p>

              {/* CTA Link */}
              <p className="text-accent font-medium hover:text-green-600">
                Learn More →
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
