import express = require("express");

import { BlockFactory } from "../block/blockFactory";
import { Chain } from "../chain/defaultChain";
import { MiningService } from "../service/miningService";
import { TransactionService } from "src/service/transactionService";

module.exports = function (
  app: express.Application,
  tommyCoin: Chain,
  transactionService: TransactionService,
  blockFactory: BlockFactory,
  nodeId: string
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

    transactionService.add({ sender: "0", recipient: nodeId, amount: 100 });

    const block = blockFactory.createBlock(nonce, proof, previousBlock.hash);

    tommyCoin.add(block);

    res.json(block);
  });
};
