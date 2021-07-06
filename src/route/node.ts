import express = require("express");

import { NodeService } from "../service/nodeService";

module.exports = function (app: express.Application, nodeService: NodeService) {
  app.post("/node", (req, res) => {
    nodeService.registerNode(req.body.nodes);
    res.json({ registered: nodeService.getRegisteredNodes() });
  });

  app.get("/node", (_, res) => {
    return res.json(nodeService.getRegisteredNodes());
  });

  app.get("/node/resolve_conflicts", (req, res) => {});
};
