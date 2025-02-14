import Link from 'next/link';

interface LinkableBoxProps {
  link?: string;
  children?: React.ReactNode;
}

const LinkableBox = ({ link, children }: LinkableBoxProps) => (
  <section className="bg-white p-8 rounded-lg shadow-lg text-center">
    {link ? (
      < Link href={link}>
        {children}
        <p className="text-accent font-medium hover:text-green-600">Learn More →</p>
      </Link >
    ) :
      children
    }
  </section >)

export default LinkableBox;