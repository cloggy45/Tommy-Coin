import sha256 from "crypto-js/sha256";
import { Transaction } from "./transactionService";

export class MiningService {
  timestamp: number;
  transactions: Transaction[];
  precedingHash: string;
  hash: string;
  nonce: number;

  constructor(timestamp: number, data: Transaction[], precedingHash = " ") {
    this.timestamp = timestamp;
    this.transactions = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash(): string {
    return sha256(this.precedingHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  getNonce() {
    return this.nonce;
  }

  mine(difficulty: number = 1): string {
    console.log("Looking for the target hash.....");

    const target = Array(difficulty + 1).join("0");

    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.computeHash();
      console.log("Checking hash " + this.hash + " meets target " + target);
    }

    return this.hash;
  }
}
