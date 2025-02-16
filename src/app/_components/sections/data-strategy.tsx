import { FaChartLine } from 'react-icons/fa';
import LinkableBox from '~/app/_components/ui/linkable-box';


interface DataStrategySectionProps {
  showLink?: boolean;
}

const DataStrategySection = ({ showLink = true }: DataStrategySectionProps) => (
  <LinkableBox
    link={showLink ? "/services/data-strategy" : undefined}
  >
    <FaChartLine className="text-accent text-4xl mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Data Strategy</h2>
    <p className="text-gray-700">
      Create a comprehensive data strategy that aligns with your business goals and maximizes the value of your data.
    </p>
    <div className="mt-6 text-left space-y-4">
      <p>
        A successful data strategy is the foundation for effective data management and utilization. Our Data Strategy service helps you identify, organize, and maximize the use of your data assets. By working closely with your team, we develop a strategy that aligns with your core objectives, ensuring that data initiatives support business growth and innovation.
      </p>
      <p>
        From governance and architecture to analytics and visualization, we design data frameworks that make it easier to access, interpret, and leverage your data. Our approach ensures that your organization has a roadmap for sustainable, data-driven decision-making that remains adaptable to future changes.
      </p>
    </div>
  </LinkableBox >
)

export default DataStrategySection;