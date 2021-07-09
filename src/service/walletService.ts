import { verifySignature } from "../../minersWallet";
import { Transaction } from "./transactionService";

export class WalletService {
  balances = new Map<string, number>();

  constructor(balances: Map<string, number>) {
    this.balances = balances;
  }

  getWallets() {
    console.log(this.balances);
    return this.balances;
  }

  addBalance(publicKey: string, amount: number) {
    if (this.balances.has(publicKey)) {
      const currentBalance = this.balances.get(publicKey);
      const newBalance = currentBalance + amount;
      this.balances.set(publicKey, newBalance);
    } else {
      this.balances.set(publicKey, amount);
    }
  }

  updateSenderBalance(transaction: Transaction) {
    const { sender, recipient, fee, amount } = transaction;

    let senderBalance = this.balances.get(sender);
    senderBalance -= fee + amount;
    this.balances.set(sender, senderBalance);

    if (senderBalance === 0) {
      this.balances.delete(sender);
    }

    this.addBalance(recipient, amount);
  }

  isValidTransaction(transaction: Transaction) {
    const { sender, fee, amount, signature } = transaction;

    if (sender !== "0" && !verifySignature("", signature, sender)) {
      console.log("Invalid signature");
      return;
    }

    if (this.balances.has(sender)) {
      const balance = this.balances.get(sender);
      return amount > 0 && balance >= fee + amount;
    } else {
      this.balances.set(sender, 100);
      return true;
    }
  }

  getBalance(address: string): any {
    return this.balances.get(address);
  }
}
