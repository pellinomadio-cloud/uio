
import React, { useState, useMemo } from 'react';
import type { Account, Transaction } from '../types';

interface AccountsProps {
  accounts: Account[];
  transactions: Transaction[];
}

export const Accounts: React.FC<AccountsProps> = ({ accounts, transactions }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(accounts[0]?.id || null);

  const selectedAccount = useMemo(() => {
    return accounts.find(acc => acc.id === selectedAccountId);
  }, [accounts, selectedAccountId]);
  
  const filteredTransactions = useMemo(() => {
    if (!selectedAccountId) return [];
    return transactions
      .filter(tx => tx.accountId === selectedAccountId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, selectedAccountId]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Your Accounts</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Account List */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="p-4 text-lg font-semibold border-b">Select Account</h2>
            <ul className="divide-y">
              {accounts.map(account => (
                <li key={account.id}>
                  <button
                    onClick={() => setSelectedAccountId(account.id)}
                    className={`w-full text-left p-4 transition-colors ${selectedAccountId === account.id ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{account.name}</p>
                        <p className={`text-sm ${selectedAccountId === account.id ? 'text-gray-200' : 'text-gray-500'}`}>{account.accountNumber}</p>
                      </div>
                      <p className={`font-bold text-lg ${selectedAccountId === account.id ? 'text-white' : (account.balance < 0 ? 'text-danger' : 'text-gray-900')}`}>
                        {formatCurrency(account.balance)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transaction History for Selected Account */}
        <div className="w-full md:w-2/3">
          {selectedAccount ? (
             <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                    <p className="text-gray-600">for {selectedAccount.name}</p>
                </div>
                {filteredTransactions.length > 0 ? (
                  <ul className="divide-y">
                    {filteredTransactions.map(tx => (
                       <li key={tx.id} className="p-4 flex justify-between items-center">
                         <div>
                            <p className="font-medium text-gray-800">{tx.description}</p>
                            <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                         </div>
                         <p className={`font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-gray-800'}`}>
                           {formatCurrency(tx.amount)}
                         </p>
                       </li>
                    ))}
                  </ul>
                ) : (
                    <p className="p-8 text-center text-gray-500">No transactions for this account.</p>
                )}
             </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Please select an account to view its history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
