import { FaCogs } from 'react-icons/fa';
import LinkableBox from '~/app/_components/ui/linkable-box';

interface AiIntegrationSectionProps {
  showLink?: boolean;
}

const AiIntegrationSection = ({ showLink = true }: AiIntegrationSectionProps) => (
  <LinkableBox link={showLink ? "/services/ai-integration" : undefined}>
    <FaCogs className="text-accent text-4xl mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">AI Integration</h2>
    <p className="text-gray-700">
      Seamlessly integrate AI solutions into your existing systems, enhancing efficiency and enabling smarter workflows.
    </p>
    <div className="mt-6 text-left space-y-4">
      <p>
        AI Integration services are designed to add intelligence to your business operations without disrupting existing workflows. We work with you to implement AI solutions that automate routine tasks, improve decision-making processes, and enhance customer experiences. Our approach is seamless, ensuring AI solutions enhance rather than complicate your daily operations.
      </p>
      <p>
        From natural language processing to computer vision and predictive analytics, we bring cutting-edge AI technologies to your business. Our integration process prioritizes usability and accessibility, making it easy for your team to adapt to and benefit from new AI-driven efficiencies.
      </p>
    </div>
  </LinkableBox>
)

export default AiIntegrationSection;