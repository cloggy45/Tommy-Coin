import { Transaction, TransactionService } from "../service/transactionService";

export interface Block {
  previousHash: string;
  hash: string;
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  balances: Map<string, number>;
  blockHeight: number;
  coinbaseBeneficiary: string;
}

export class BlockFactory {
  transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  getCurrentTime(): number {
    return Math.round(new Date().getTime() / 1000);
  }

  /**
   * Create the first block of the blockchain
   * @param hash initial hash
   */
  createGenesisBlock(hash: string): Block {
    const timestamp = this.getCurrentTime();

    return {
      timestamp,
      transactions: [],
      previousHash: "0",
      nonce: 0,
      hash,
      balances: new Map<string, number>(),
      blockHeight: 1,
      coinbaseBeneficiary: "",
    };
  }

  /**
   *
   * @param nonce value used to generate the hash which contains the target value.
   * @param hash that contains the target value.
   * @param previousHash from the previous block.
   * @param balances keeps track of the balances of each registered wallet
   * @param blockHeight total size of the block chain
   * @param coinbaseBeneficiary
   */
  createBlock(
    nonce: number,
    hash: string,
    previousHash: string,
    balances: Map<string, number>,
    blockHeight: number,
    coinbaseBeneficiary: string
  ): Block {
    const transactions = this.transactionService.getTransactions();

    this.transactionService.clearTransactions();

    const timestamp = this.getCurrentTime();

    return {
      timestamp,
      transactions,
      hash,
      nonce,
      previousHash,
      balances: balances,
      blockHeight,
      coinbaseBeneficiary,
    };
  }
}
