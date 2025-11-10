
import React from 'react';
import { AccountCard } from '../components/AccountCard';
import { TransactionList } from '../components/TransactionList';
import type { Account, Transaction } from '../types';
// FIX: Changed import path for View type.
import type { View } from '../types';

interface DashboardProps {
  userName: string;
  accounts: Account[];
  transactions: Transaction[];
  onViewChange: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName, accounts, transactions, onViewChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Good Morning, {userName}!</h1>
        <p className="mt-1 text-md text-gray-600">Here's your financial overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(account => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
             <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
             <button
               onClick={() => onViewChange('transfer')}
               className="w-full text-left p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
             >
               <h4 className="font-semibold text-blue-800">Transfer Money</h4>
               <p className="text-sm text-blue-600">Move funds between your accounts.</p>
             </button>
             <button
                onClick={() => onViewChange('accounts')}
                className="w-full text-left p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
             >
               <h4 className="font-semibold text-green-800">View All Accounts</h4>
               <p className="text-sm text-green-600">See detailed transaction history.</p>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
