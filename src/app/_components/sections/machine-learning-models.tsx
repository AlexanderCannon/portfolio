import { FaRobot } from 'react-icons/fa';
import LinkableBox from '../linkable-box';

interface MachineLearningModelsSectionProps {
  showLink?: boolean;
}

const MachineLearningModelsSection = ({ showLink = true }: MachineLearningModelsSectionProps) => (
  <LinkableBox link={showLink ? "/services/machine-learning-models" : undefined}>
    <FaRobot className="text-accent text-4xl mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Machine Learning Models</h2>
    <p className="text-gray-700">
      Build predictive models that empower your business to make data-driven decisions with accuracy and insight.
    </p>
    <div className="mt-6 text-left space-y-4">
      <p>
        Our Machine Learning Models service is dedicated to transforming raw data into powerful predictive tools. With customized algorithms and advanced analytics, we create models that provide valuable foresight into business trends, customer behavior, and operational efficiencies. Each model is designed to be robust, scalable, and tailored to the unique requirements of your business.
      </p>
      <p>
        By leveraging the latest in machine learning technology, our team ensures high accuracy and reliability. From classification and regression to clustering and recommendation systems, our models empower you to make data-driven decisions with confidence, helping you stay competitive in an evolving market.
      </p>
    </div>
  </LinkableBox>
)

export default MachineLearningModelsSection;