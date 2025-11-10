
import type { Account } from '../types';

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc_1',
    name: 'Marvelous',
    accountNumber: '**** **** **** 1234',
    balance: 15137.52,
    // FIX: Added 'type' property to conform to the updated Account interface.
    type: 'checking',
  },
];
