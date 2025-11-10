
import React from 'react';
import type { Account } from '../types';

interface AccountCardProps {
  account: Account;
}

const typeStyles = {
    checking: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-500',
    },
    savings: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-500',
    },
    credit: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-800',
        border: 'border-indigo-500',
    }
}

export const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const styles = typeStyles[account.type];
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(account.balance);

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${styles.border} transition-transform transform hover:scale-105`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
          <p className="text-sm text-gray-500">{account.accountNumber}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>
          {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Current Balance</p>
        <p className={`text-3xl font-bold ${account.balance < 0 ? 'text-danger' : 'text-gray-900'}`}>{formattedBalance}</p>
      </div>
    </div>
  );
};
