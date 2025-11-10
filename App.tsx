import React, { useState, useEffect, useRef } from 'react';
import type { Account, Transaction } from './types';

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
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>;
const IconWrapper = ({ children, className = '' }: { children?: React.ReactElement, className?: string }) => <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-lighter-green ${className}`}>{children}</div>;
const HomeIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const RewardsIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9m0 2.01V11m0 2.01V13m0 2.01V15m0 2.01V17m0 2.01V19M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>;
const RewardsActionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9m0 2.01V11m0 2.01V13m0 2.01V15m0 2.01V17m0 2.01V19M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>;
const FinanceIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CardsIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const MeIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const AlarmClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CreditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const DebitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010-18z" /></svg>;
const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const SyncIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5m11 2a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 4v5h-5" /></svg>;

// --- UI Section Components ---
const AppHeader = ({ userName }: { userName: string }) => (
  <header className="flex items-center justify-between p-4 bg-white">
    <div className="flex items-center space-x-2">
      <OpayLogo />
      <h1 className="font-bold text-lg capitalize">Hi, {userName}</h1>
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

const BalanceCard = ({ balance, onNavigateToHistory }: { balance: number, onNavigateToHistory: () => void }) => {
  const formattedBalance = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(balance);
  return (
    <div className="bg-primary text-primary-content rounded-2xl p-4 shadow-lg space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <span>Available Balance</span>
          <EyeIcon />
        </div>
        <button onClick={onNavigateToHistory} className="flex items-center space-x-1">
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

const QuickActionItem = ({ icon, label, onClick }: { icon: React.ReactElement, label: string, onClick?: () => void }) => (
    <div onClick={onClick} className={`flex flex-col items-center space-y-2 ${onClick ? 'cursor-pointer' : ''}`}>
        <div className="w-16 h-16 bg-lighter-green rounded-2xl flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium text-dark-gray">{label}</span>
    </div>
);

const QuickActions = ({ onNavigateToRewards, onNavigateToSubscription, onNavigateToWithdraw }: { onNavigateToRewards: () => void, onNavigateToSubscription: () => void, onNavigateToWithdraw: () => void }) => (
    <div className="bg-white rounded-2xl p-4 flex justify-around items-center shadow-sm">
        <QuickActionItem onClick={onNavigateToSubscription} icon={<CrownIcon />} label="Subscribe" />
        <QuickActionItem onClick={onNavigateToRewards} icon={<RewardsActionIcon />} label="Rewards" />
        <QuickActionItem onClick={onNavigateToWithdraw} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} label="Withdraw" />
    </div>
);

const ServiceItem = ({ icon, label, tag, onClick }: { icon: React.ReactElement; label: string; tag?: string; onClick?: () => void; }) => (
    <div onClick={onClick} className={`flex flex-col items-center space-y-2 text-center relative ${onClick ? 'cursor-pointer' : ''}`}>
        {tag && <span className="absolute -top-2 text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-semibold">{tag}</span>}
        <IconWrapper className="w-14 h-14 bg-light-green">{icon}</IconWrapper>
        <span className="text-xs font-medium text-dark-gray">{label}</span>
    </div>
);

const Services = ({ onNavigateToSync }: { onNavigateToSync: () => void }) => (
    <div className="bg-white rounded-2xl p-4 grid grid-cols-4 gap-y-6 gap-x-2 shadow-sm">
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>} label="Airtime" tag="Up to 6%"/>
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>} label="Data" tag="Up to 6%"/>
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} label="Betting" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>} label="TV" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>} label="Safebox" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Loan" tag="LoanMore" />
        <ServiceItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Refer & Earn" />
        <ServiceItem onClick={onNavigateToSync} icon={<SyncIcon />} label="Sync Account" />
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

const SecurityTest = ({ onNavigateToAdmin }: { onNavigateToAdmin: () => void }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-dark-gray flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Security Test</span>
            </h3>
            <button onClick={onNavigateToAdmin} className="text-xs font-semibold bg-green-100 text-primary px-3 py-1.5 rounded-full cursor-pointer">Click for Security</button>
        </div>
        <p className="text-sm text-gray-600">What should I do if my phone gets stolen?</p>
        <p className="text-sm text-gray-400">A. Block your account, dial *955*131#.</p>
    </div>
);

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
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

// --- Auth Page Components ---

const LoginPage = ({ onLogin, onSwitchToRegister }: { onLogin: (email: string, password: string) => Promise<string | null>, onSwitchToRegister: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const loginError = await onLogin(email, password);
        if (loginError) {
            setError(loginError);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-light-gray flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full mx-auto">
                <div className="flex justify-center mb-6">
                    <OpayLogo />
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                    <h1 className="text-2xl font-bold text-center text-dark-gray">Login to Your Account</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6-digit Password"
                                className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                                maxLength={6}
                                pattern="\d{6}"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-medium-gray"
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't have an account?{' '}
                        <span onClick={onSwitchToRegister} className="font-semibold text-primary cursor-pointer">
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const RegistrationPage = ({ onRegister, onSwitchToLogin }: { onRegister: (email: string, password: string) => Promise<string | null>, onSwitchToLogin: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        const passwordRegex = /^\d{6}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must be exactly 6 digits.');
            return;
        }
        
        setIsLoading(true);
        const registrationError = await onRegister(email, password);
        if (registrationError) {
            setError(registrationError);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-light-gray flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full mx-auto">
                 <div className="flex justify-center mb-6">
                    <OpayLogo />
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md space-y-6">
                    <h1 className="text-2xl font-bold text-center text-dark-gray">Create Your Account</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                           <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6-digit Password"
                                className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                                maxLength={6}
                                pattern="\d{6}"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-medium-gray"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <span onClick={onSwitchToLogin} className="font-semibold text-primary cursor-pointer">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const AuthFlow = ({ onLogin, onRegister }: { onLogin: (email: string, password: string) => Promise<string | null>, onRegister: (email: string, password: string) => Promise<string | null> }) => {
    const [view, setView] = useState('login'); // 'login' or 'register'

    if (view === 'register') {
        return <RegistrationPage onRegister={onRegister} onSwitchToLogin={() => setView('login')} />
    }
    
    return <LoginPage onLogin={onLogin} onSwitchToRegister={() => setView('register')} />
}

// --- Page Components ---
const HomePage = ({ userName, account, onNavigateToRewards, onNavigateToHistory, onNavigateToSubscription, onNavigateToAdmin, onNavigateToSync, onNavigateToWithdraw }: { 
    userName: string, 
    account: Account, 
    onNavigateToRewards: () => void,
    onNavigateToHistory: () => void,
    onNavigateToSubscription: () => void,
    onNavigateToAdmin: () => void,
    onNavigateToSync: () => void,
    onNavigateToWithdraw: () => void,
}) => {
    return (
        <>
            <div className="bg-white sticky top-0 z-10 shadow-sm">
                <AppHeader userName={userName} />
            </div>
            <main className="p-4 space-y-5">
                <BalanceCard balance={account.balance} onNavigateToHistory={onNavigateToHistory} />
                <BusinessService />
                <QuickActions onNavigateToRewards={onNavigateToRewards} onNavigateToSubscription={onNavigateToSubscription} onNavigateToWithdraw={onNavigateToWithdraw} />
                <Services onNavigateToSync={onNavigateToSync} />
                <SpecialBonus />
                <SecurityTest onNavigateToAdmin={onNavigateToAdmin} />
            </main>
        </>
    );
};

const RewardsPage = ({ onBack, account, setAccount, addTransaction, claimedDays, setClaimedDays, lastClaimTimestamp, setLastClaimTimestamp }: { 
    onBack: () => void; 
    account: Account; 
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    claimedDays: number;
    setClaimedDays: React.Dispatch<React.SetStateAction<number>>;
    lastClaimTimestamp: number;
    setLastClaimTimestamp: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [isClaimable, setIsClaimable] = useState(false);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastClaim = now - lastClaimTimestamp;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (timeSinceLastClaim >= twentyFourHours) {
            setIsClaimable(true);
        } else {
            setIsClaimable(false);
            const interval = setInterval(() => {
                const remaining = twentyFourHours - (Date.now() - lastClaimTimestamp);
                if (remaining <= 0) {
                    setIsClaimable(true);
                    setCountdown('');
                    clearInterval(interval);
                } else {
                    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((remaining / 1000 / 60) % 60);
                    const seconds = Math.floor((remaining / 1000) % 60);
                    setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [lastClaimTimestamp]);

    const handleClaim = () => {
        if (!isClaimable || claimedDays >= 100) return;
        
        const rewardAmount = 100000;
        const newClaimedDays = claimedDays + 1;
        setClaimedDays(newClaimedDays);
        
        const now = Date.now();
        setLastClaimTimestamp(now);
        
        setIsClaimable(false);
        
        if (setAccount && account) {
            const newBalance = account.balance + rewardAmount;
            const updatedAccount = { ...account, balance: newBalance };
            setAccount(updatedAccount);
            addTransaction({
                description: `Daily Reward - Day ${newClaimedDays}`,
                amount: rewardAmount,
                type: 'credit',
            });
        }
    };

    const progress = Math.min(100, Math.round((claimedDays / 100) * 100));

    return (
      <div className="bg-lighter-green min-h-screen">
        <header className="bg-lighter-green p-4 flex items-center space-x-4 sticky top-0 z-10">
          <button onClick={onBack} className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shadow-md">
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-bold text-dark-gray">Daily Rewards</h1>
        </header>
        <main className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 space-y-2 shadow-md">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Progress: {progress}%</span>
              <span className="text-gray-500">{claimedDays}/100 days</span>
            </div>
            <div className="w-full bg-medium-gray rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="bg-primary text-white rounded-xl p-6 text-center space-y-4 shadow-lg">
            <div className="flex justify-center">
              <AlarmClockIcon />
            </div>
            <p>Next reward available in:</p>
            {isClaimable ? (
              <button onClick={handleClaim} className="bg-white/30 hover:bg-white/40 text-white font-bold py-3 px-8 rounded-lg text-lg w-full transition-colors">
                Ready to Claim! 🎉
              </button>
            ) : (
              <div className="bg-green-700/50 text-white font-mono py-3 px-8 rounded-lg text-lg w-full">
                {countdown || '23:59:59'}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((day) => {
              const isClaimed = day <= claimedDays;
              const canClaim = day === claimedDays + 1 && isClaimable;
              const rewardAmount = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(100000);
              
              return (
                <div key={day} className={`rounded-xl p-2 text-center text-xs space-y-1 shadow-sm
                  ${isClaimed ? 'bg-primary text-white' : 'bg-white text-dark-gray border border-green-200'}
                  ${canClaim ? 'animate-pulse border-2 border-yellow-400' : ''}
                `}>
                  <p className="font-semibold text-gray-500">Day {day}</p>
                  <p className="font-bold text-sm">{rewardAmount}</p>
                  {isClaimed && <p className="font-medium flex items-center justify-center space-x-1 text-green-200 text-[10px]">✓ Claimed</p>}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
};

const SubscriptionPage = ({ onBack, userEmail }: { onBack: () => void; userEmail: string; }) => {
    const plans = [
        { name: 'Weekly', price: 6200, duration: '7 days' },
        { name: 'Monthly', price: 8300, duration: '30 days' },
        { name: 'Yearly', price: 30000, duration: '365 days' },
    ];

    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
    const [paymentProof, setPaymentProof] = useState<string | null>(null);
    const [proofFileName, setProofFileName] = useState<string>('');
    const [copySuccess, setCopySuccess] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentProof(reader.result as string);
                setProofFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCopy = () => {
        const accountNumber = '7075402374';
        navigator.clipboard.writeText(accountNumber).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    const handleSubmit = () => {
        if (!selectedPlan || !paymentProof) return;

        const subject = `Subscription Payment Proof - ${selectedPlan.name} Plan`;
        const body = `Hello,

Please find my payment proof attached for the ${selectedPlan.name} subscription.

My account email is: ${userEmail}

Thank you.
`;
        const mailtoLink = `mailto:ukf5483@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };
    
    return (
        <div className="bg-light-gray min-h-screen">
            <header className="bg-white p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray">Subscription Plans</h1>
            </header>
            <main className="p-4 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-dark-gray mb-3">Choose Your Plan</h2>
                    <div className="space-y-3">
                        {plans.map(plan => (
                            <div
                                key={plan.name}
                                onClick={() => setSelectedPlan(plan)}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan?.name === plan.name ? 'border-primary bg-lighter-green' : 'border-medium-gray bg-white'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-dark-gray">{plan.name} Plan</h3>
                                        <p className="text-sm text-gray-500">{plan.duration} of premium access</p>
                                    </div>
                                    <p className="text-xl font-bold text-primary">₦{plan.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-dark-gray">Payment Details</h2>
                    <p className="text-sm text-gray-600">Make payment to the account below. Your plan will be activated after confirmation.</p>
                    <div className="bg-light-gray p-3 rounded-lg space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Bank Name:</span>
                            <span className="font-semibold text-dark-gray">MOMO-psb</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Account Name:</span>
                            <span className="font-semibold text-dark-gray">oluwatosin olido</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 text-sm">Account Number:</span>
                                <p className="font-bold text-lg text-dark-gray tracking-wider">7075402374</p>
                            </div>
                            <button onClick={handleCopy} className="bg-green-100 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                                {copySuccess || 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
                
                 <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-dark-gray">Upload Payment Proof</h2>
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        accept="image/*" 
                    />
                    <button onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-medium-gray rounded-lg p-4 text-center text-gray-500 hover:border-primary hover:text-primary transition-colors">
                        {proofFileName ? `✓ ${proofFileName}` : 'Click to select an image'}
                    </button>
                    {paymentProof && (
                        <div className="mt-4">
                            <img src={paymentProof} alt="Payment proof preview" className="rounded-lg max-h-48 mx-auto" />
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleSubmit}
                    disabled={!selectedPlan || !paymentProof}
                    className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-medium-gray disabled:cursor-not-allowed"
                >
                   {selectedPlan ? `Submit for ${selectedPlan.name} Plan` : 'Select a plan and upload proof'}
                </button>
            </main>
        </div>
    );
};


const MePage = ({ user, setUser, profilePic, setProfilePic, onLogout }: { 
    user: { email: string }, 
    setUser: React.Dispatch<React.SetStateAction<{ email: string } | null>>,
    profilePic: string | null,
    setProfilePic: React.Dispatch<React.SetStateAction<string | null>>,
    onLogout: () => void
}) => {
    const [newEmail, setNewEmail] = useState(user.email);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfilePic(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSave = () => {
        // In a real app, email change would require re-authentication and more complex logic.
        // For this mock, we'll just show a success message as the data is saved automatically via useEffect in App.
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold text-center text-dark-gray">My Profile</h1>
            <div className="flex flex-col items-center space-y-4">
                <div className="relative cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleProfilePicChange} 
                        className="hidden" 
                        accept="image/*" 
                    />
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-primary" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                             <UserCircleIcon />
                        </div>
                    )}
                    <div className="absolute bottom-1 right-1 bg-primary p-2 rounded-full">
                        <CameraIcon />
                    </div>
                </div>
                <p className="font-semibold text-lg">{user.email.split('@')[0]}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                <h2 className="font-bold text-lg text-dark-gray">Edit Information</h2>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        readOnly
                        disabled
                        className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
                </div>
                {message && <p className="text-sm text-green-600 text-center">{message}</p>}
                <button
                    onClick={handleSave}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Save Changes
                </button>
                 <button
                    onClick={onLogout}
                    className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

const TransactionHistoryPage = ({ onBack, transactions }: { 
    onBack: () => void;
    transactions: Transaction[];
}) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-light-gray min-h-screen">
            <header className="bg-white p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray">Transaction History</h1>
            </header>
            <main className="p-4 space-y-3">
                {transactions.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <p>No transactions yet.</p>
                        <p className="text-sm">Your claimed rewards and withdrawals will appear here.</p>
                    </div>
                ) : (
                    transactions.map(tx => (
                        <div key={tx.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center space-x-4">
                                <IconWrapper className="bg-light-green">
                                    {tx.type === 'credit' ? <CreditIcon /> : <DebitIcon />}
                                </IconWrapper>
                                <div>
                                    <p className="font-semibold text-dark-gray">{tx.description}</p>
                                    <p className="text-xs text-gray-500">{formatDate(tx.date)}</p>
                                </div>
                            </div>
                           {tx.amount > 0 && (
                             <p className={`font-bold text-lg ${tx.type === 'credit' ? 'text-primary' : 'text-red-500'}`}>
                                {tx.type === 'credit' ? '+ ' : '- '}
                                {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(tx.amount)}
                             </p>
                           )}
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

const AdminPage = ({ onBack, user, addTransaction }: {
    onBack: () => void;
    user: { email: string };
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}) => {
    const plans = [
        { name: 'Weekly', price: 6200 },
        { name: 'Monthly', price: 8300 },
        { name: 'Yearly', price: 30000 },
    ];
    
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0]>(plans[0]);
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (adminPassword !== 'MAVELLDC') {
            setError('Incorrect admin password.');
            return;
        }

        if (!selectedPlan) {
            setError('Please select a subscription plan.');
            return;
        }

        addTransaction({
            description: `Congratulations! You've been subscribed to the ${selectedPlan.name} plan.`,
            amount: 0,
            type: 'credit',
        });

        setSuccess(`User ${user.email} has been subscribed to the ${selectedPlan.name} plan.`);
        setAdminPassword('');
        
        setTimeout(() => {
            onBack();
        }, 2500);
    };

    return (
        <div className="bg-light-gray min-h-screen">
            <header className="bg-white p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray">Admin Panel</h1>
            </header>
            <main className="p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-6">
                    <h2 className="text-lg font-bold text-center text-dark-gray">Subscribe User</h2>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">User Email</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            disabled
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                     <div>
                        <label htmlFor="plan" className="block text-sm font-medium text-gray-700">Select Plan</label>
                        <select
                            id="plan"
                            value={selectedPlan.name}
                            onChange={(e) => setSelectedPlan(plans.find(p => p.name === e.target.value) || plans[0])}
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                        >
                            {plans.map(plan => (
                                <option key={plan.name} value={plan.name}>
                                    {plan.name} - ₦{plan.price.toLocaleString()}
                                </option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">Admin Password</label>
                        <input
                            type="password"
                            id="admin-password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    {success && <p className="text-sm text-green-600 text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Subscribe User
                    </button>
                </form>
            </main>
        </div>
    );
};

const SyncAccountPage = ({ onBack, user }: { onBack: () => void; user: { email: string } }) => {
    const [syncCode, setSyncCode] = useState('');
    const [restoreCode, setRestoreCode] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [restoreMessage, setRestoreMessage] = useState('');
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        try {
            const userData = localStorage.getItem(`opay_data_${user.email}`);
            
            if (!userData) {
                setSyncCode('Error: User data not found.');
                return;
            }

            const jsonString = JSON.stringify(JSON.parse(userData));
            const encoded = btoa(jsonString);
            setSyncCode(encoded);
        } catch (error) {
            console.error('Failed to generate sync code:', error);
            setSyncCode('Error generating sync code.');
        } finally {
            setIsGenerating(false);
        }
    }, [user.email]);
    
    const handleCopy = () => {
        if (!syncCode || syncCode.startsWith('Error')) return;
        navigator.clipboard.writeText(syncCode).then(() => {
            setCopySuccess('Copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy.');
        });
    };

    const handleRestore = () => {
        if (!restoreCode.trim()) {
            setRestoreMessage('Please paste a code to restore.');
            return;
        }

        try {
            const decodedString = atob(restoreCode);
            const data = JSON.parse(decodedString);

            if (!data.account || !data.account.name) {
                throw new Error('Invalid sync code format.');
            }

            localStorage.setItem(`opay_data_${user.email}`, JSON.stringify(data));
            
            setRestoreMessage('Account data synced successfully! The app will now reload.');
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error('Failed to restore account:', error);
            setRestoreMessage('Restore failed. The code is invalid or corrupted.');
        }
    };

    return (
        <div className="bg-light-gray min-h-screen">
            <header className="bg-white p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray">Sync & Restore Account</h1>
            </header>
            <main className="p-4 space-y-6">
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-dark-gray">1. Sync Your Account</h2>
                    <p className="text-sm text-gray-600">Copy this code and paste it on another device to restore your account data.</p>
                    <textarea
                        readOnly
                        value={isGenerating ? 'Generating code...' : syncCode}
                        className="w-full h-32 p-2 border border-medium-gray rounded-lg bg-gray-50 font-mono text-xs"
                        placeholder="Your account sync code will appear here."
                    />
                    <button
                        onClick={handleCopy}
                        disabled={isGenerating || syncCode.startsWith('Error')}
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-medium-gray"
                    >
                        {copySuccess || 'Copy Code'}
                    </button>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-dark-gray">2. Restore Account</h2>
                    <p className="text-sm text-gray-600">Paste a sync code here to restore another account on this device.</p>
                    <textarea
                        value={restoreCode}
                        onChange={(e) => setRestoreCode(e.target.value)}
                        className="w-full h-32 p-2 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary font-mono text-xs"
                        placeholder="Paste sync code here..."
                    />
                    {restoreMessage && <p className={`text-sm text-center ${restoreMessage.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>{restoreMessage}</p>}
                    <button
                        onClick={handleRestore}
                        className="w-full bg-green-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-900 transition-colors"
                    >
                        Restore Account
                    </button>
                </div>
            </main>
        </div>
    );
};

const WithdrawPage = ({ onBack, account, setAccount, addTransaction, transactions, onNavigateToSubscription }: { 
    onBack: () => void;
    account: Account;
    setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    transactions: Transaction[];
    onNavigateToSubscription: () => void;
}) => {
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const banks = [
        'OPay', 'PalmPay', 'Moniepoint', 'Access Bank', 'UBA', 'GTBank', 
        'First Bank', 'Zenith Bank', 'Kuda Bank', 'Wema Bank', 'Fidelity Bank'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        if (numericAmount > account.balance) {
            setError('Insufficient funds.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const isSubscribed = transactions.some(tx => 
                tx.description.toLowerCase().includes('subscribed to the')
            );

            if (isSubscribed) {
                const newBalance = account.balance - numericAmount;
                const updatedAccount = { ...account, balance: newBalance };
                setAccount(updatedAccount);
                addTransaction({
                    description: `Withdrawal to ${accountName}`,
                    amount: numericAmount,
                    type: 'debit',
                });
                setSuccess('Withdrawal successful!');
                setTimeout(() => {
                    onBack();
                }, 2000);
            } else {
                setError('Withdrawal failed. You must subscribe to a plan to withdraw funds.');
            }
            setIsLoading(false);
        }, 5000);
    };

    return (
        <div className="bg-light-gray min-h-screen">
            <header className="bg-white p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray">Withdraw Funds</h1>
            </header>
            <main className="p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-6">
                    <div>
                        <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Select Bank</label>
                        <select
                            id="bank"
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="" disabled>-- Select a bank --</option>
                            {banks.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">Account Number</label>
                        <input
                            type="text"
                            id="account-number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 10-digit account number"
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                            pattern="\d{10}"
                            maxLength={10}
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">Account Name</label>
                        <input
                            type="text"
                            id="account-name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            placeholder="Enter account name"
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="mt-1 w-full px-4 py-3 border border-medium-gray rounded-lg focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                    
                    {error && (
                        <div className="text-sm text-red-500 text-center p-3 bg-red-50 rounded-lg">
                            <p>{error}</p>
                            {error.includes('subscribe') && (
                                <button type="button" onClick={onNavigateToSubscription} className="font-bold underline mt-2 text-primary">
                                    Go to Subscription Page
                                </button>
                            )}
                        </div>
                    )}
                    {success && <p className="text-sm text-green-600 text-center">{success}</p>}
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-medium-gray flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Withdraw'}
                    </button>
                </form>
            </main>
        </div>
    );
};

const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
        <h1 className="text-2xl font-bold text-gray-400">{title} Page</h1>
        <p className="text-gray-500">Coming Soon!</p>
    </div>
);


// --- App Container ---
const App: React.FC = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const [account, setAccount] = useState<Account | null>(null);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [claimedDays, setClaimedDays] = useState(0);
    const [lastClaimTimestamp, setLastClaimTimestamp] = useState(0);

    const [activeTab, setActiveTab] = useState('Home');
    const [view, setView] = useState('main'); // 'main', 'rewards', 'history', 'subscription', 'admin', 'sync', 'withdraw'

    const loadUserData = (email: string) => {
        try {
            const userDataRaw = localStorage.getItem(`opay_data_${email}`);
            if (userDataRaw) {
                const data = JSON.parse(userDataRaw);
                setUser({ email });
                setAccount(data.account);
                setTransactions(data.transactions || []);
                setProfilePic(data.profilePic || null);
                setClaimedDays(data.claimedDays || 0);
                setLastClaimTimestamp(data.lastClaimTimestamp || 0);
            }
        } catch (error) {
            console.error("Failed to load user data", error);
        }
    };

    useEffect(() => {
        try {
            const sessionRaw = localStorage.getItem('opay_session');
            if (sessionRaw) {
                const session = JSON.parse(sessionRaw);
                if (session.email) {
                    loadUserData(session.email);
                }
            }
        } catch (error) {
            console.error("Failed to parse session data from localStorage", error);
            localStorage.removeItem('opay_session');
        }
    }, []);

    useEffect(() => {
        if (!user || !account) return;

        const dataToSave = {
            account,
            transactions,
            profilePic,
            claimedDays,
            lastClaimTimestamp,
        };
        localStorage.setItem(`opay_data_${user.email}`, JSON.stringify(dataToSave));

    }, [user, account, transactions, profilePic, claimedDays, lastClaimTimestamp]);


    const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
        setTransactions(prev => {
            const newTransaction: Transaction = {
                ...transaction,
                id: `txn_${Date.now()}`,
                date: new Date().toISOString(),
            };
            return [newTransaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
    };
    
    const handleLogin = async (email: string, password: string): Promise<string | null> => {
        const usersRaw = localStorage.getItem('opay_users');
        const users = usersRaw ? JSON.parse(usersRaw) : [];

        const foundUser = users.find((u: any) => u.email === email);
        if (!foundUser || foundUser.password !== password) {
            return 'Invalid email or password.';
        }

        localStorage.setItem('opay_session', JSON.stringify({ email }));
        loadUserData(email);
        return null;
    };

    const handleRegister = async (email: string, password: string): Promise<string | null> => {
        const usersRaw = localStorage.getItem('opay_users');
        const users = usersRaw ? JSON.parse(usersRaw) : [];

        if (users.find((u: any) => u.email === email)) {
            return 'An account with this email already exists.';
        }

        users.push({ email, password });
        localStorage.setItem('opay_users', JSON.stringify(users));

        const initialAccount: Account = {
            id: `acc_${email}`,
            name: email.split('@')[0],
            accountNumber: '**** **** **** 5000',
            balance: 5000,
            type: 'checking',
        };
        const initialUserData = {
            account: initialAccount,
            transactions: [],
            profilePic: null,
            claimedDays: 0,
            lastClaimTimestamp: 0,
        };
        localStorage.setItem(`opay_data_${email}`, JSON.stringify(initialUserData));

        return handleLogin(email, password);
    };
    
    const handleLogout = () => {
        localStorage.removeItem('opay_session');
        setUser(null);
        setAccount(null);
        setTransactions([]);
        setProfilePic(null);
        setClaimedDays(0);
        setLastClaimTimestamp(0);
        setActiveTab('Home');
        setView('main');
    };

    if (!user || !account) {
        return <AuthFlow onLogin={handleLogin} onRegister={handleRegister} />;
    }
    
    if (view === 'rewards') {
        return <RewardsPage onBack={() => setView('main')} account={account} setAccount={setAccount} addTransaction={addTransaction} claimedDays={claimedDays} setClaimedDays={setClaimedDays} lastClaimTimestamp={lastClaimTimestamp} setLastClaimTimestamp={setLastClaimTimestamp} />;
    }
    
    if (view === 'history') {
        return <TransactionHistoryPage onBack={() => setView('main')} transactions={transactions} />;
    }
    
    if (view === 'subscription') {
        return <SubscriptionPage onBack={() => setView('main')} userEmail={user.email} />;
    }
    
    if (view === 'admin') {
        return <AdminPage onBack={() => setView('main')} user={user} addTransaction={addTransaction} />;
    }

    if (view === 'sync') {
        return <SyncAccountPage onBack={() => setView('main')} user={user} />;
    }
    
    if (view === 'withdraw') {
        return <WithdrawPage onBack={() => setView('main')} account={account} setAccount={setAccount} addTransaction={addTransaction} transactions={transactions} onNavigateToSubscription={() => setView('subscription')} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return <HomePage userName={account.name} account={account} onNavigateToRewards={() => setView('rewards')} onNavigateToHistory={() => setView('history')} onNavigateToSubscription={() => setView('subscription')} onNavigateToAdmin={() => setView('admin')} onNavigateToSync={() => setView('sync')} onNavigateToWithdraw={() => setView('withdraw')} />;
            case 'Me':
                return <MePage user={user} setUser={setUser} profilePic={profilePic} setProfilePic={setProfilePic} onLogout={handleLogout} />;
            case 'Rewards':
                 return <PlaceholderPage title="Rewards" />;
            case 'Finance':
                 return <PlaceholderPage title="Finance" />;
            case 'Cards':
                 return <PlaceholderPage title="Cards" />;
            default:
                return <HomePage userName={account.name} account={account} onNavigateToRewards={() => setView('rewards')} onNavigateToHistory={() => setView('history')} onNavigateToSubscription={() => setView('subscription')} onNavigateToAdmin={() => setView('admin')} onNavigateToSync={() => setView('sync')} onNavigateToWithdraw={() => setView('withdraw')} />;
        }
    };
    
    return (
        <div className="max-w-md mx-auto bg-light-gray font-sans relative pb-24 min-h-screen">
            {renderContent()}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default App;
