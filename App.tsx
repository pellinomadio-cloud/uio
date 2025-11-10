
import React, { useState } from 'react';
import { MOCK_ACCOUNTS } from './data/mockData';

// --- Icon Components ---
const OpayLogo = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#16A34A"/>
    <path d="M24.0002 12C17.3728 12 12.0002 17.3726 12.0002 24C12.0002 30.6274 17.3728 36 24.0002 36C30.6276 36 36.0002 30.6274 36.0002 24C36.0002 17.3726 30.6276 12 24.0002 12ZM24.0002 32.4C19.3492 32.4 15.6002 28.651 15.6002 24C15.6002 19.349 19.3492 15.6 24.0002 15.6C28.6512 15.6 32.4002 19.349 32.4002 24C32.4002 28.651 28.6512 32.4 24.0002 32.4Z" fill="white"/>
    <path d="M28.7042 22.1158C28.7042 24.5158 26.5442 26.1838 24.0002 26.1838C21.4562 26.1838 19.2962 24.5158 19.2962 22.1158C19.2962 19.7158 21.4562 18 24.0002 18C26.5442 18 28.7042 19.7158 28.7042 22.1158Z" fill="white"/>
  </svg>
);
const HeadsetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m-2.12-2.122a3 3 0 010 4.242M6.343 17.657l-1.414-1.414a6 6 0 010-8.486l1.414 1.414a4 4 0 010 5.658zM17 12a5 5 0 01-5 5H3a2 2 0 01-2-2V9a2 2 0 012-2h9a5 5 0 015 5z" /></svg>;
const ScanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
// FIX: Made children prop optional to resolve TypeScript error.
const IconWrapper = ({ children, className = '' }: { children?: any, className?: string }) => <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-lighter-green ${className}`}>{children}</div>;
const HomeIcon = ({ active }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const RewardsIcon = ({ active }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9m0 2.01V11m0 2.01V13m0 2.01V15m0 2.01V17m0 2.01V19M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>;
const FinanceIcon = ({ active }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CardsIcon = ({ active }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const MeIcon = ({ active }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


// --- UI Section Components ---

const Header = ({ userName }) => (
  <header className="flex items-center justify-between p-4 bg-white">
    <div className="flex items-center space-x-2">
      <OpayLogo />
      <h1 className="font-bold text-lg">Hi, {userName}</h1>
    </div>
    <div className="flex items-center space-x-4 text-dark-gray">
        <div className="relative">
            <HeadsetIcon />
            <span className="absolute -top-1 -right-2 text-xs text-white bg-red-500 px-1 rounded-full font-semibold">HELP</span>
        </div>
      <ScanIcon />
      <div className="relative">
        <BellIcon />
        <span className="absolute -top-2 -right-2 text-xs text-white bg-red-500 w-5 h-5 flex items-center justify-center rounded-full font-bold">45</span>
      </div>
    </div>
  </header>
);

const BalanceCard = ({ balance }) => {
  const formattedBalance = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(balance);
  return (
    <div className="bg-primary text-primary-content rounded-2xl p-4 shadow-lg space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <span>Available Balance</span>
          <EyeIcon />
        </div>
        <button className="flex items-center space-x-1">
          <span>Transaction History</span>
          <ChevronRightIcon />
        </button>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-3xl font-bold">{formattedBalance}</p>
        <button className="bg-white text-primary font-bold py-2 px-4 rounded-lg text-sm">+ Add Money</button>
      </div>
    </div>
  );
};

const BusinessService = () => (
    <div className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
            <IconWrapper><BuildingIcon /></IconWrapper>
            <p>Business Service - Today's Sales: ₦0.00</p>
        </div>
        <ChevronRightIcon />
    </div>
);

const QuickActionItem = ({ icon, label }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-lighter-green rounded-2xl flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium text-dark-gray">{label}</span>
    </div>
);

const QuickActions = () => (
    <div className="bg-white rounded-2xl p-4 flex justify-around items-center shadow-sm">
        <QuickActionItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} label="To OPay" />
        <QuickActionItem icon={<BuildingIcon />} label="To Bank" />
        <QuickActionItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} label="Withdraw" />
    </div>
);

// FIX: Made the `tag` prop optional as it is not provided in all use cases.
const ServiceItem = ({ icon, label, tag }: { icon: any; label: string; tag?: string; }) => (
    <div className="flex flex-col items-center space-y-2 text-center relative">
        {tag && <span className="absolute -top-2 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-semibold">{tag}</span>}
        <IconWrapper className="w-14 h-14 bg-light-green">{icon}</IconWrapper>
        <span className="text-xs font-medium text-dark-gray">{label}</span>
    </div>
);

const Services = () => (
    <div className="bg-white rounded-2xl p-4 grid grid-cols-4 gap-y-6 gap-x-2 shadow-sm">
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>} label="Airtime" tag="Up to 6%"/>
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>} label="Data" tag="Up to 6%"/>
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} label="Betting" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>} label="TV" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>} label="Safebox" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Loan" tag="LoanMore" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Refer & Earn" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>} label="More" />
    </div>
);

const SpecialBonus = () => (
    <div className="bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 rounded-2xl p-4 flex justify-between items-center shadow-sm overflow-hidden relative">
        <div className="space-y-1 z-10">
            <h3 className="font-bold text-dark-gray flex items-center">Special Bonus For Your <ChevronRightIcon /></h3>
            <p className="font-bold text-lg text-gray-800">Claim Your Rewards 🎁</p>
            <p className="text-xs text-gray-500">Grab FREE coupons & cashbacks!</p>
        </div>
        <div className="absolute -right-8 -bottom-8">
             <svg className="w-40 h-40 text-primary opacity-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        </div>
    </div>
);

const SecurityTest = () => (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-dark-gray flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Security Test</span>
            </h3>
            <button className="text-xs font-semibold bg-green-100 text-primary px-3 py-1.5 rounded-full">Click for Security</button>
        </div>
        <p className="text-sm text-gray-600">What should I do if my phone gets stolen?</p>
        <p className="text-sm text-gray-400">A. Block your account, dial *955*131#.</p>
    </div>
);

const BottomNav = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const navItems = [
        { name: 'Home', icon: HomeIcon },
        { name: 'Rewards', icon: RewardsIcon },
        { name: 'Finance', icon: FinanceIcon },
        { name: 'Cards', icon: CardsIcon },
        { name: 'Me', icon: MeIcon },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-medium-gray shadow-lg">
            <div className="flex justify-around">
                {navItems.map(item => {
                    const isActive = activeTab === item.name;
                    return (
                        <button key={item.name} onClick={() => setActiveTab(item.name)} className="flex flex-col items-center justify-center text-center p-3 space-y-1">
                            <item.icon active={isActive} />
                            <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-dark-gray'}`}>{item.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

// --- Main App Component ---
const App: React.FC = () => {
  const [userName] = useState('MARVELOUS');
  const [account] = useState(MOCK_ACCOUNTS[0]);
  
  return (
    <div className="max-w-md mx-auto bg-light-gray font-sans relative pb-24">
        <div className="bg-white sticky top-0 z-10 shadow-sm">
            <Header userName={userName} />
        </div>
        <main className="p-4 space-y-5">
            <BalanceCard balance={account.balance} />
            <BusinessService />
            <QuickActions />
            <Services />
            <SpecialBonus />
            <SecurityTest />
        </main>
        <BottomNav />
    </div>
  );
};

export default App;
