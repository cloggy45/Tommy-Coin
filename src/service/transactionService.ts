import { WalletService } from "./walletService";

export interface Transaction {
  sender: string;
  recipient: string;
  amount: number;
  signature: string;
  fee: number;
}

export class TransactionService {
  pendingTransactions: Transaction[];
  walletService: WalletService;

  constructor(walletService: WalletService) {
    this.pendingTransactions = [];
    this.walletService = walletService;
  }

  add(transaction: Transaction) {
    if (this.walletService.isValidTransaction(transaction)) {
      this.walletService.updateSenderBalance(transaction);
      this.pendingTransactions.push(transaction);
    }
  }

  getTransactions() {
    return this.pendingTransactions;
  }

  clearTransactions() {
    this.pendingTransactions = [];
  }
}
