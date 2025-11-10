
import React from 'react';
import { TransferForm } from '../components/TransferForm';
import type { Account } from '../types';

interface TransferProps {
  accounts: Account[];
  onTransfer: (fromAccountId: string, toAccountId: string, amount: number) => void;
}

export const Transfer: React.FC<TransferProps> = ({ accounts, onTransfer }) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Make a Transfer</h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Quickly and securely move funds between your accounts. Please select the source and destination accounts and enter the amount you wish to transfer.
      </p>
      <div className="mt-8">
        <TransferForm accounts={accounts} onTransfer={onTransfer} />
      </div>
    </div>
  );
};
