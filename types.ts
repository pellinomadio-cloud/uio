export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}
