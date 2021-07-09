import express = require("express");

import { TransactionService } from "../service/transactionService";

module.exports = function (
  app: express.Application,
  transactionService: TransactionService
) {
  app.get("/transaction", (_, res) => {
    res.json(transactionService.getTransactions());
  });

  app.post("/transaction", (req, res) => {
    const { sender, recipient, amount, fee, signature } = req.body;

    if (
      sender === "" ||
      amount === "" ||
      recipient === "" ||
      signature === "" ||
      fee === ""
    ) {
      res.send("Missing values");
      return;
    }

    transactionService.add({ sender, recipient, amount, fee, signature });

    res.json({ sender, recipient, amount, fee, signature });
  });
};
