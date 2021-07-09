import express = require("express");
import { WalletService } from "../service/walletService";

module.exports = function (
  app: express.Application,
  walletService: WalletService
) {
  app.get("/wallet/:address", (req, res) => {
    const address = req.params.address;
    return res.json({ address, balance: walletService.getBalance(address) });
  });

  app.get("/wallet", (req, res) => {
    let wallets = [...walletService.getWallets().entries()].map((wallet) => {
      return { address: wallet[0], balance: wallet[1] };
    });
    return res.json({ wallets });
  });
};
