import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, type Chat, type GenerateContentResponse } from "@google/genai";
import type { Account, Transaction } from './types';

// --- Icon Components ---
const NovapayLogo = () => (
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
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>;
const IconWrapper = ({ children, className = '' }: { children?: React.ReactElement, className?: string }) => <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-lighter-green dark:bg-gray-700 ${className}`}>{children}</div>;
const HomeIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const RewardsIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9m0 2.01V11m0 2.01V13m0 2.01V15m0 2.01V17m0 2.01V19M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>;
const RewardsActionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01V5M12 20v-1m0-1v-1m0-1v-1m0-1v-1m0-1V9m0 2.01V11m0 2.01V13m0 2.01V15m0 2.01V17m0 2.01V19M12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>;
const FinanceIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const CardsIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const MeIcon = ({ active }: { active: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${active ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const AlarmClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CreditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const DebitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110 18 9 9 0 010-18z" /></svg>;
const CrownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const SyncIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5m11 2a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 4v5h-5" /></svg>;
const TelegramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88l-4.98-3.65l-2.32 2.23c-.25.24-.45.43-.86.43z"></path></svg>;
const ChatBubbleLeftRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>;
const XMarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const PaperAirplaneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 -rotate-45"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;

// --- UI Section Components ---
const AppHeader = ({ userName }: { userName: string }) => (
  <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
    <div className="flex items-center space-x-2">
      <NovapayLogo />
      <h1 className="font-bold text-lg capitalize text-dark-gray dark:text-gray-200">Hi, {userName}</h1>
    </div>
    <div className="flex items-center space-x-4 text-dark-gray dark:text-gray-300">
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
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const formattedBalance = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(balance);
  const hiddenBalance = `₦ ${'•'.repeat(formattedBalance.length - 2)}`;

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(prev => !prev);
  };

  return (
    <div className="bg-primary text-primary-content rounded-2xl p-4 shadow-lg space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleBalanceVisibility}>
          <span>Available Balance</span>
          {isBalanceVisible ? <EyeIcon /> : <EyeOffIcon />}
        </div>
        <button onClick={onNavigateToHistory} className="flex items-center space-x-1">
          <span>Transaction History</span>
          <ChevronRightIcon />
        </button>
      </div>
      <div className="flex justify-between items-end">
        <p className="text-3xl font-bold">{isBalanceVisible ? formattedBalance : hiddenBalance}</p>
        <button className="bg-white text-primary font-bold py-2 px-4 rounded-lg text-sm">+ Add Money</button>
      </div>
    </div>
  );
};

const BusinessService = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
            <IconWrapper><BuildingIcon /></IconWrapper>
            <p className="text-dark-gray dark:text-gray-200">Business Service - Today's Sales: ₦0.00</p>
        </div>
        <ChevronRightIcon />
    </div>
);

const QuickActionItem = ({ icon, label, onClick }: { icon: React.ReactElement, label: string, onClick?: () => void }) => (
    <div onClick={onClick} className={`flex flex-col items-center space-y-2 ${onClick ? 'cursor-pointer' : ''}`}>
        <div className="w-16 h-16 bg-lighter-green dark:bg-gray-700 rounded-2xl flex items-center justify-center">{icon}</div>
        <span className="text-sm font-medium text-dark-gray dark:text-gray-300">{label}</span>
    </div>
);

const QuickActions = ({ onNavigateToRewards, onNavigateToSubscription, onNavigateToWithdraw }: { onNavigateToRewards: () => void, onNavigateToSubscription: () => void, onNavigateToWithdraw: () => void }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex justify-around items-center shadow-sm">
        <QuickActionItem onClick={onNavigateToSubscription} icon={<CrownIcon />} label="Subscribe" />
        <QuickActionItem onClick={onNavigateToRewards} icon={<RewardsActionIcon />} label="Rewards" />
        <QuickActionItem onClick={onNavigateToWithdraw} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} label="Withdraw" />
    </div>
);

const ServiceItem = ({ icon, label, tag, onClick }: { icon: React.ReactElement; label: string; tag?: string; onClick?: () => void; }) => (
    <div onClick={onClick} className={`flex flex-col items-center space-y-2 text-center relative ${onClick ? 'cursor-pointer' : ''}`}>
        {tag && <span className="absolute -top-2 text-xs bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400 px-2 py-0.5 rounded-full font-semibold">{tag}</span>}
        <IconWrapper className="w-14 h-14 bg-light-green dark:bg-gray-700">{icon}</IconWrapper>
        <span className="text-xs font-medium text-dark-gray dark:text-gray-300">{label}</span>
    </div>
);

const Services = ({ onNavigateToSync, isSubscribed, onNavigateToSubscription, onNavigateToAirtime, onNavigateToData, onNavigateToRefer, onNavigateToTelegram, onNavigateToSafebox, onNavigateToLoan }: { 
    onNavigateToSync: () => void;
    isSubscribed: boolean;
    onNavigateToSubscription: () => void;
    onNavigateToAirtime: () => void;
    onNavigateToData: () => void;
    onNavigateToRefer: () => void;
    onNavigateToTelegram: () => void;
    onNavigateToSafebox: () => void;
    onNavigateToLoan: () => void;
}) => {
    const handleServiceClick = (service: 'airtime' | 'data') => {
        if (isSubscribed) {
            if (service === 'airtime') onNavigateToAirtime();
            else onNavigateToData();
        } else {
            alert('You need a Monthly or Yearly subscription to use this service. Please subscribe to continue.');
            onNavigateToSubscription();
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 grid grid-cols-4 gap-y-6 gap-x-2 shadow-sm">
            <ServiceItem onClick={() => handleServiceClick('airtime')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>} label="Airtime" tag="Up to 6%"/>
            <ServiceItem onClick={() => handleServiceClick('data')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>} label="Data" tag="Up to 6%"/>
            <ServiceItem onClick={onNavigateToSubscription} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} label="Betting" />
            <ServiceItem onClick={onNavigateToTelegram} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>} label="TV" />
            <ServiceItem onClick={onNavigateToSafebox} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>} label="Safebox" />
            <ServiceItem onClick={onNavigateToLoan} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Loan" tag="LoanMore" />
            <ServiceItem onClick={onNavigateToRefer} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} label="Refer & Earn" />
            <ServiceItem onClick={onNavigateToSync} icon={<SyncIcon />} label="Sync Account" />
        </div>
    );
};


const SpecialBonus = () => (
    <div className="bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 dark:bg-gray-800 rounded-2xl p-4 flex justify-between items-center shadow-sm overflow-hidden relative">
        <div className="space-y-1 z-10">
            <h3 className="font-bold text-dark-gray dark:text-gray-200 flex items-center">Special Bonus For Your <ChevronRightIcon /></h3>
            <p className="font-bold text-lg text-gray-800 dark:text-gray-100">Claim Your Rewards 🎁</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Grab FREE coupons & cashbacks!</p>
        </div>
        <div className="absolute -right-8 -bottom-8">
             <svg className="w-40 h-40 text-primary opacity-10 dark:opacity-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        </div>
    </div>
);

const SecurityTest = ({ onNavigateToAdmin }: { onNavigateToAdmin: () => void }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-dark-gray dark:text-gray-200 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Security Test</span>
            </h3>
            <button onClick={onNavigateToAdmin} className="text-xs font-semibold bg-green-100 text-primary dark:bg-green-900/50 dark:text-green-300 px-3 py-1.5 rounded-full cursor-pointer">Click for Security</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">What should I do if my phone gets stolen?</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">A. Block your account, dial *955*131#.</p>
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
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t border-medium-gray dark:border-gray-700 shadow-lg">
            <div className="flex justify-around">
                {navItems.map(item => {
                    const isActive = activeTab === item.name;
                    return (
                        <button key={item.name} onClick={() => setActiveTab(item.name)} className="flex flex-col items-center justify-center text-center p-3 space-y-1">
                            <item.icon active={isActive} />
                            <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-dark-gray dark:text-gray-400'}`}>{item.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}

// --- New Component ---
const TestimonialPopup = ({ name, amount }: { name: string; amount: number; }) => (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 max-w-xs w-full px-4" style={{ zIndex: 100 }}>
         <div className="bg-gray-800/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg text-sm text-center">
            <p><strong>{name}</strong> just withdrew <strong>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)}</strong></p>
        </div>
    </div>
);


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
        <div className="min-h-screen bg-light-gray dark:bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full mx-auto">
                <div className="flex justify-center mb-6">
                    <NovapayLogo />
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6">
                    <h1 className="text-2xl font-bold text-center text-dark-gray dark:text-gray-200">Login to Your Account</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-medium-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary"
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
                                className="w-full px-4 py-3 border border-medium-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary"
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
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
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
        <div className="min-h-screen bg-light-gray dark:bg-gray-900 flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full mx-auto">
                 <div className="flex justify-center mb-6">
                    <NovapayLogo />
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-6">
                    <h1 className="text-2xl font-bold text-center text-dark-gray dark:text-gray-200">Create Your Account</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-medium-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary"
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
                                className="w-full px-4 py-3 border border-medium-gray dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-lg focus:ring-primary focus:border-primary"
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
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
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

// --- Subscription Helper ---
const getSubscriptionStatus = (transactions: Transaction[]): 'none' | 'weekly' | 'monthly' | 'yearly' => {
    // Transactions are sorted by date descending, so find will get the latest subscription.
    const subscriptionTx = transactions.find(tx => tx.description.toLowerCase().includes('subscribed to the'));

    if (!subscriptionTx) {
        return 'none';
    }

    const description = subscriptionTx.description.toLowerCase();
    const txDate = new Date(subscriptionTx.date);
    const now = new Date();
    const daysSinceTx = (now.getTime() - txDate.getTime()) / (1000 * 3600 * 24);

    if (description.includes('yearly plan')) {
        return daysSinceTx <= 365 ? 'yearly' : 'none';
    }
    if (description.includes('monthly plan')) {
        return daysSinceTx <= 30 ? 'monthly' : 'none';
    }
    if (description.includes('weekly plan')) {
        return daysSinceTx <= 7 ? 'weekly' : 'none';
    }

    return 'none';
};

// --- Page Components ---
const HomePage = ({ userName, account, transactions, onNavigateToRewards, onNavigateToHistory, onNavigateToSubscription, onNavigateToAdmin, onNavigateToSync, onNavigateToWithdraw, onNavigateToAirtime, onNavigateToData, onNavigateToRefer, onNavigateToTelegram, onNavigateToSafebox, onNavigateToLoan, testimonial }: { 
    userName: string, 
    account: Account,
    transactions: Transaction[],
    onNavigateToRewards: () => void,
    onNavigateToHistory: () => void,
    onNavigateToSubscription: () => void,
    onNavigateToAdmin: () => void,
    onNavigateToSync: () => void,
    onNavigateToWithdraw: () => void,
    onNavigateToAirtime: () => void,
    onNavigateToData: () => void,
    onNavigateToRefer: () => void,
    onNavigateToTelegram: () => void,
    onNavigateToSafebox: () => void,
    onNavigateToLoan: () => void,
    testimonial: { name: string; amount: number } | null,
}) => {
    const subscriptionStatus = getSubscriptionStatus(transactions);
    const isSubscribed = subscriptionStatus === 'monthly' || subscriptionStatus === 'yearly';

    return (
        <>
            <div className="bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
                <AppHeader userName={userName} />
            </div>
            <main className="p-4 space-y-5">
                <BalanceCard balance={account.balance} onNavigateToHistory={onNavigateToHistory} />
                <BusinessService />
                <QuickActions onNavigateToRewards={onNavigateToRewards} onNavigateToSubscription={onNavigateToSubscription} onNavigateToWithdraw={onNavigateToWithdraw} />
                <Services 
                    onNavigateToSync={onNavigateToSync}
                    isSubscribed={isSubscribed}
                    onNavigateToSubscription={onNavigateToSubscription}
                    onNavigateToAirtime={onNavigateToAirtime}
                    onNavigateToData={onNavigateToData}
                    onNavigateToRefer={onNavigateToRefer}
                    onNavigateToTelegram={onNavigateToTelegram}
                    onNavigateToSafebox={onNavigateToSafebox}
                    onNavigateToLoan={onNavigateToLoan}
                />
                <SpecialBonus />
                <SecurityTest onNavigateToAdmin={onNavigateToAdmin} />
            </main>
            {testimonial && <TestimonialPopup name={testimonial.name} amount={testimonial.amount} />}
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
      <div className="bg-lighter-green dark:bg-gray-900 min-h-screen">
        <header className="bg-lighter-green dark:bg-gray-900 p-4 flex items-center space-x-4 sticky top-0 z-10">
          <button onClick={onBack} className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shadow-md">
            <ArrowLeftIcon />
          </button>
          <h1 className="text-xl font-bold text-dark-gray dark:text-gray-200">Daily Rewards</h1>
        </header>
        <main className="p-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-2 shadow-md">
            <div className="flex justify-between items-center text-sm font-medium text-dark-gray dark:text-gray-300">
              <span>Progress: {progress}%</span>
              <span className="text-gray-500 dark:text-gray-400">{claimedDays}/100 days</span>
            </div>
            <div className="w-full bg-medium-gray dark:bg-gray-700 rounded-full h-2.5">
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
                  ${isClaimed ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-dark-gray dark:text-gray-300 border border-green-200 dark:border-gray-700'}
                  ${canClaim ? 'animate-pulse border-2 border-yellow-400' : ''}
                `}>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Day {day}</p>
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
        <div className="bg-light-gray dark:bg-gray-900 min-h-screen">
            <header className="bg-white dark:bg-gray-800 p-4 flex items-center space-x-4 sticky top-0 z-10 shadow-sm">
                <button onClick={onBack} className="p-2 -ml-2 text-dark-gray dark:text-gray-200">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-dark-gray dark:text-gray-200">Subscription Plans</h1>
            </header>
            <main className="p-4 space-y-6">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 rounded-md" role="alert">
                    <p className="font-bold">Important Notice</p>
                    <p>Do not pay for your subscription using Opay. You can use Palmpay or other banks. We do not approve OPAY payment for subscription.</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-dark-gray dark:text-gray-200 mb-3">Choose Your Plan</h2>
                    <div className="space-y-3">
                        {plans.map(plan => (
                            <div
                                key={plan.name}
                                onClick={() => setSelectedPlan(plan)}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan?.name === plan.name ? 'border-primary bg-lighter-green dark:border-primary dark:bg-primary/10' : 'border-medium-gray dark:border-gray-600 bg-white dark:bg-gray-800'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-dark-gray dark:text-gray-200">{plan.name} Plan</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{plan.duration} of premium access</p>
                                    </div>
                                    <p className="text-xl font-bold text-primary">₦{plan.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-dark-gray dark:text-gray-200">Payment Details</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Make payment to the account below. Your plan will be activated after confirmation.</p>
                    <div className="bg-light-gray dark:bg-gray-700 p-3 rounded-lg space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Bank Name:</span>
                            <span className="font-semibold text-dark-gray dark:text-gray-200">MOMO-psb</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Account Name:</span>
                            <span className="font-semibold text-dark-gray dark:text-gray-200">oluwatosin olido</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Account Number:</span>
                                <p className="font-bold text-lg text-dark-gray dark:text-gray-200 tracking-wider">7075402374</p>
                            </div>
                            <button onClick={handleCopy} className="bg-green-100 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                                {copySuccess || 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- ChatBot Component ---
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Fallback if API key is missing, but assume it's there as per instructions
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
          throw new Error("API Key not configured.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are Nova, the helpful AI assistant for NOVAPAY. You help users with their banking, explaining features like rewards (daily login bonus), subscriptions (Weekly, Monthly, Yearly plans for premium features), and security. Keep answers short, friendly, and emoji-rich. If a user asks about their specific account balance or transaction details, politely explain that for security reasons you cannot access their private data directly, but guide them on how to check it in the app."
        },
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of result) {
        const text = chunk.text;
        fullText += text;
        setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].text = fullText;
            return newArr;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server right now. Please check your internet connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 bg-primary text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open Support Chat"
      >
        <ChatBubbleLeftRightIcon />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700" style={{ maxHeight: '60vh' }}>
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
               <div className="bg-white p-1 rounded-full">
                 <NovapayLogo /> 
               </div>
               <span className="font-bold">Nova Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-green-700 rounded">
              <XMarkIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-4 text-sm">
                    <p>👋 Hi! I'm Nova.</p>
                    <p>Ask me about your account, rewards, or subscriptions.</p>
                </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-gray-700 p-3 rounded-xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className={`p-2 rounded-full ${!input.trim() ? 'text-gray-400' : 'text-primary hover:bg-green-50'}`}
            >
              <PaperAirplaneIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// --- Main App Component ---
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [currentView, setCurrentView] = useState<'home' | 'rewards' | 'subscription' | 'history' | 'transfer'>('home');
  
  // Mock Data State
  const [account, setAccount] = useState<Account>({
    id: '1',
    name: 'User',
    accountNumber: '1234567890',
    balance: 50000,
    type: 'checking'
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([
     { id: '1', date: new Date().toISOString(), description: 'Transfer from John', amount: 5000, type: 'credit' },
     { id: '2', date: new Date(Date.now() - 86400000).toISOString(), description: 'Airtime Purchase', amount: 1000, type: 'debit' }
  ]);

  // Rewards State
  const [claimedDays, setClaimedDays] = useState(0);
  const [lastClaimTimestamp, setLastClaimTimestamp] = useState(0);
  
  // Testimonial State (Mock)
  const [testimonial, setTestimonial] = useState<{ name: string; amount: number } | null>(null);

  useEffect(() => {
      // Simulate random testimonials appearing
      const interval = setInterval(() => {
          if (Math.random() > 0.7) {
              setTestimonial({ name: `User${Math.floor(Math.random()*1000)}`, amount: Math.floor(Math.random() * 50000) + 5000 });
              setTimeout(() => setTestimonial(null), 4000);
          }
      }, 10000);
      return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: string, p: string) => {
     // Simple mock auth
     if(e && p.length === 6) {
         setIsLoggedIn(true);
         return null;
     }
     return "Invalid credentials";
  };

  const handleRegister = async (e: string, p: string) => {
     if(e && p.length === 6) {
         setIsLoggedIn(true);
         return null;
     }
     return "Registration failed";
  };

  if (!isLoggedIn) {
    return <AuthFlow onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-light-gray dark:bg-gray-900 text-dark-gray dark:text-white pb-20 relative">
       {currentView === 'home' && (
         <HomePage 
           userName={account.name}
           account={account}
           transactions={transactions}
           onNavigateToRewards={() => setCurrentView('rewards')}
           onNavigateToSubscription={() => setCurrentView('subscription')}
           onNavigateToHistory={() => setCurrentView('history')}
           onNavigateToAdmin={() => alert('Admin panel restricted')}
           onNavigateToSync={() => alert('Syncing...')}
           onNavigateToWithdraw={() => alert('Withdraw feature coming soon')}
           onNavigateToAirtime={() => alert('Airtime feature coming soon')}
           onNavigateToData={() => alert('Data feature coming soon')}
           onNavigateToRefer={() => alert('Referral feature coming soon')}
           onNavigateToTelegram={() => alert('Opening Telegram...')}
           onNavigateToSafebox={() => alert('Safebox feature coming soon')}
           onNavigateToLoan={() => alert('Loan feature coming soon')}
           testimonial={testimonial}
         />
       )}
       
       {currentView === 'rewards' && (
         <RewardsPage 
            onBack={() => setCurrentView('home')}
            account={account}
            setAccount={setAccount as any}
            addTransaction={(tx) => setTransactions(prev => [{id: Date.now().toString(), date: new Date().toISOString(), ...tx}, ...prev])}
            claimedDays={claimedDays}
            setClaimedDays={setClaimedDays}
            lastClaimTimestamp={lastClaimTimestamp}
            setLastClaimTimestamp={setLastClaimTimestamp}
         />
       )}

       {currentView === 'subscription' && (
          <SubscriptionPage onBack={() => setCurrentView('home')} userEmail="user@example.com" />
       )}

       {/* Simple placeholder views for missing components */}
       {currentView === 'history' && (
           <div className="p-4">
               <button onClick={() => setCurrentView('home')} className="mb-4 flex items-center text-primary font-bold"><ArrowLeftIcon /> Back</button>
               <h2 className="text-xl font-bold mb-4">Transaction History</h2>
               <div className="space-y-2">
                   {transactions.map(tx => (
                       <div key={tx.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex justify-between">
                           <div>
                               <p className="font-semibold">{tx.description}</p>
                               <p className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                           </div>
                           <p className={`font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                               {tx.type === 'credit' ? '+' : '-'}₦{tx.amount.toLocaleString()}
                           </p>
                       </div>
                   ))}
               </div>
           </div>
       )}

       {/* Bottom Nav for main views - only show on home for now or handle navigation logic */}
       {currentView === 'home' && <BottomNav activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); }} />}
       
       {/* ChatBot Integration - Works globally when logged in */}
       <ChatBot />
    </div>
  );
}

export default App;
