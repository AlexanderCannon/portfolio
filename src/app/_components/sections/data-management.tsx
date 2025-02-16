import { FaDatabase } from 'react-icons/fa';
import LinkableBox from '~/app/_components/ui/linkable-box';

interface DataManagementSectionProps {
  showLink?: boolean;
}

const DataManagementSection = ({ showLink = true }: DataManagementSectionProps) => (
  <LinkableBox link={showLink ? "/services/data-management" : undefined}>
    <FaDatabase className="text-accent text-4xl mx-auto mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Data Management</h2>
    <p className="text-gray-700">
      Optimize data storage, accessibility, and security to ensure your data remains a reliable and valuable asset.
    </p>
    <div className="mt-6 text-left space-y-4">
      <p>
        Data Management is crucial for maintaining the integrity, accessibility, and security of your business data. Our Data Management service provides end-to-end solutions for data storage, organization, and protection, ensuring your data remains an asset that supports business growth. We help you structure your data to improve access and compliance.
      </p>
      <p>
        By implementing best practices in data management, we enable you to minimize risks, maximize value, and streamline your data operations. Our solutions ensure that your data is always reliable and ready to support decision-making processes, helping you harness data as a strategic resource.
      </p>
    </div>
  </LinkableBox>
)

export default DataManagementSection;