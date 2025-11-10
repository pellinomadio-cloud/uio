
export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  // FIX: Added 'type' property to support account-specific styling and logic.
  type: 'checking' | 'savings' | 'credit';
}

// FIX: Defined the missing Transaction interface.
export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

// FIX: Defined the missing View type for navigation.
export type View = 'dashboard' | 'accounts' | 'transfer';
