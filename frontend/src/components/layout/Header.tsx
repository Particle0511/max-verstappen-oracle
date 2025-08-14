import Link from 'next/link';
import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-oracle-lightblue w-full p-4 flex justify-between items-center border-b border-gray-700">
      <Link href="/" className="flex items-center space-x-2">
        <Rocket className="h-8 w-8 text-oracle-red" />
        <h1 className="text-2xl font-bold text-oracle-lightgray">
          Max Verstappen <span className="text-oracle-red">Oracle</span>
        </h1>
      </Link>
      <nav>
        <Link href="/dashboard" className="text-oracle-gray hover:text-oracle-lightgray transition-colors">
          Dashboard
        </Link>
      </nav>
    </header>
  );
};

export default Header;