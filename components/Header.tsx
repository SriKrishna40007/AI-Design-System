
import React from 'react';
import { APP_NAME } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-2xl font-bold tracking-wider text-cyan-400">
          {APP_NAME}
        </h1>
        <p className="text-sm text-gray-400">Multi-Agent Design Optimization & Validation</p>
      </div>
    </header>
  );
};

export default Header;
