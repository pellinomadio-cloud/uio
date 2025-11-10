
import React from 'react';
// FIX: Changed import path for View type.
import type { View } from '../types';
import { ICON_DASHBOARD, ICON_ACCOUNTS, ICON_TRANSFER, ICON_LOGO } from '../constants';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: ICON_DASHBOARD },
  { id: 'accounts', label: 'Accounts', icon: ICON_ACCOUNTS },
  { id: 'transfer', label: 'Transfer', icon: ICON_TRANSFER },
] as const;


const NavItem: React.FC<{
    item: typeof navItems[number];
    isActive: boolean;
    onClick: () => void;
}> = ({ item, isActive, onClick }) => {
    const activeClasses = 'bg-primary-dark text-white';
    const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';
    
    // For Desktop Sidebar
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {React.cloneElement(item.icon, { className: 'h-6 w-6 mr-3' })}
            {item.label}
        </a>
    );
};


const MobileNavItem: React.FC<{
    item: typeof navItems[number];
    isActive: boolean;
    onClick: () => void;
}> = ({ item, isActive, onClick }) => {
    const activeClasses = 'text-primary';
    const inactiveClasses = 'text-gray-500 hover:text-primary';
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`flex flex-col items-center justify-center text-center p-2 rounded-lg transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {React.cloneElement(item.icon, { className: 'h-6 w-6 mb-1' })}
            <span className="text-xs font-medium">{item.label}</span>
        </a>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
            <div className="flex items-center text-white space-x-2">
                {ICON_LOGO}
                <span className="font-semibold text-lg">Zenith Bank</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto bg-gray-800">
            <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map(item => (
                    <NavItem 
                        key={item.id}
                        item={item}
                        isActive={activeView === item.id}
                        onClick={() => setActiveView(item.id)}
                    />
                ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="grid grid-cols-3">
              {navItems.map(item => (
                  <MobileNavItem 
                      key={item.id}
                      item={item}
                      isActive={activeView === item.id}
                      onClick={() => setActiveView(item.id)}
                  />
              ))}
          </div>
      </div>
    </>
  );
};
