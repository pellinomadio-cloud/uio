
import React, { useState, useEffect } from 'react';
import type { Account } from '../types';

interface TransferFormProps {
  accounts: Account[];
  onTransfer: (fromAccountId: string, toAccountId: string, amount: number) => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ accounts, onTransfer }) => {
  const [fromAccount, setFromAccount] = useState<string>('');
  const [toAccount, setToAccount] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (accounts.length > 0) {
      setFromAccount(accounts[0].id);
    }
    if (accounts.length > 1) {
      setToAccount(accounts[1].id);
    }
  }, [accounts]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const transferAmount = parseFloat(amount);
    const sourceAccount = accounts.find(acc => acc.id === fromAccount);

    // Validation
    if (!fromAccount || !toAccount || !amount) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }
    if (fromAccount === toAccount) {
      setError('Cannot transfer to the same account.');
      setIsSubmitting(false);
      return;
    }
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid positive amount.');
      setIsSubmitting(false);
      return;
    }
    if (sourceAccount && sourceAccount.balance < transferAmount && sourceAccount.type !== 'credit') {
      setError('Insufficient funds for this transfer.');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onTransfer(fromAccount, toAccount, transferAmount);
      setSuccess(`Successfully transferred $${transferAmount.toFixed(2)}.`);
      // Reset form
      setAmount('');
      setIsSubmitting(false);
    }, 1500);
  };

  const nonCreditAccounts = accounts.filter(acc => acc.type !== 'credit');
  const selectableToAccounts = accounts.filter(acc => acc.id !== fromAccount);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700">From</label>
          <select
            id="fromAccount"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
          >
            {nonCreditAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - ${acc.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700">To</label>
          <select
            id="toAccount"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
          >
            {selectableToAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>
                {acc.name} - ${acc.balance.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        {success && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">{success}</p>}

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Confirm Transfer'}
          </button>
        </div>
      </form>
    </div>
  );
};
