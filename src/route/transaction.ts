import express = require("express");

import { TransactionService } from "src/service/transactionService";

module.exports = function (app: express.Application, transactionService: TransactionService) {
  app.get("/transaction", (_, res) => {
    res.json(transactionService.getTransactions());
  });

  app.post("/transaction", (req, res) => {
    const { sender, recipient, amount } = req.body;

    if (sender === "" || amount === "" || recipient === "") {
      res.send("Missing values");
      return;
    }

    transactionService.add({ sender, recipient, amount });

    res.json({ sender, recipient, amount });
  });
};
