export interface Transaction {
  sender: string;
  recipient: string;
  amount: number;
}

export class TransactionService {
  pendingTransactions: Transaction[];

  constructor() {
    this.pendingTransactions = [];
  }

  add(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getTransactions() {
    return this.pendingTransactions;
  }

  clearTransactions() {
    this.pendingTransactions = [];
  }
}
