import express = require("express");

import { DefaultChain } from "../chain/defaultChain";

module.exports = function (app: express.Application, tommyCoin: DefaultChain) {
  app.get("/chain/validate", (_, res) => {
    res.json({ isChainValid: tommyCoin.isChainValid() });
  });
  app.get("/chain", (_, res) => {
    return res.json(tommyCoin.getChain());
  });
  app.get("/chain/resolve", (_, res) => {
    tommyCoin.resolve();
    return res.sendStatus(200);
  });
};
