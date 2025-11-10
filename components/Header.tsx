
import React from 'react';
import { ICON_BELL } from '../constants';

interface HeaderProps {
  userName: string;
}

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        {/* On md+ this can be used for breadcrumbs or page title */}
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Welcome back, {userName}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          {ICON_BELL}
        </button>
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={`https://i.pravatar.cc/150?u=${userName}`}
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};
