
import React from 'react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const isCredit = transaction.type === 'credit';

  return (
    <li className="py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isCredit ? 'bg-green-100' : 'bg-gray-200'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isCredit ? 'text-green-600' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isCredit ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            )}
          </svg>
        </div>
        <div>
          <p className="text-md font-medium text-gray-900">{transaction.description}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <p className={`text-md font-semibold ${isCredit ? 'text-success' : 'text-gray-900'}`}>
        {formattedAmount}
      </p>
    </li>
  );
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
         <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
      </div>
      {transactions.length > 0 ? (
        <ul className="divide-y divide-gray-200 px-4">
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </ul>
      ) : (
        <p className="text-center py-8 text-gray-500">No transactions to display.</p>
      )}
    </div>
  );
};
