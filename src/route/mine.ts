import express = require("express");

import { BlockFactory } from "../block/blockFactory";
import { Chain } from "../chain/defaultChain";
import { MiningService } from "../service/miningService";
import { TransactionService } from "../service/transactionService";
import { WalletService } from "../service/walletService";
import { minersKeys, sign } from "../../minersWallet";

module.exports = function (
  app: express.Application,
  tommyCoin: Chain,
  transactionService: TransactionService,
  blockFactory: BlockFactory,
  walletService: WalletService
) {
  app.get("/mine", (_, res) => {
    const previousBlock = tommyCoin.getLatestBlock();
    const minerService = new MiningService(
      Date.now(),
      transactionService.getTransactions(),
      previousBlock.hash
    );

    const proof = minerService.mine(2);
    const nonce = minerService.getNonce();

    //Reward the miner since they have completed the proof of work
    transactionService.add({
      sender: "0",
      recipient: minersKeys.publicKey,
      amount: 5,
      fee: 0,
      signature: sign("", minersKeys.privateKey), // TODO Hash the transaction and pass it as a message to sign()
    });

    const block = blockFactory.createBlock(
      nonce,
      proof,
      previousBlock.hash,
      walletService.balances,
      previousBlock.blockHeight + 1,
      minersKeys.publicKey
    );

    tommyCoin.add(block);

    res.json(block);
  });
};
