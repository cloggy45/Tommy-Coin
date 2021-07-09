import fetch from "node-fetch";

import { Address, NodeService } from "../service/nodeService";
import { Block } from "../block/blockFactory";

export interface Chain {
  getLatestBlock: () => Block;
  isChainValid: () => boolean;
  add: (block: Block) => void;
  getChain: () => Block[];
}

export class DefaultChain implements Chain {
  blockchain: Block[];
  nodeService: NodeService;

  constructor(nodeService: NodeService) {
    this.blockchain = [];
    this.nodeService = nodeService;
  }

  validateBlock(
    _: boolean,
    currentBlock: Block,
    currentBlockId: number,
    blockChain: Block[]
  ) {
    const previousBlockId = currentBlockId - 1;

    // ignore genesis block which has no predecessor
    if (currentBlockId === 0) {
      return true;
    }

    if (currentBlock.timestamp < blockChain[previousBlockId].timestamp) {
      return false;
    }

    return currentBlock.previousHash === blockChain[previousBlockId].hash;
  }

  isChainValid(): boolean {
    return this.blockchain.reduce<boolean>(this.validateBlock, true);
  }

  getLatestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  add(block: Block): void {
    this.blockchain.push(block);
    console.log("Block added!");
  }

  getCurrentTime(): number {
    return Math.round(new Date().getTime() / 1000);
  }

  getChain() {
    return this.blockchain;
  }

  resolve() {
    console.log("Fetching registered nodes....");
    let registeredNodes = this.nodeService.getRegisteredNodes();
    if (registeredNodes.length === 0) {
      return;
    }
    registeredNodes.forEach((address: Address) => {
      fetch(address + "chain")
        .then<Block[]>((response) => {
          console.log(`Getting chain for address:${address}`);
          return response.json();
        })
        .then((nodeChain) => {
          console.log("Comparing chains...");
          console.log("neighbours blockchain: " + nodeChain.length);
          console.log("current blockchain: " + this.blockchain.length);
          if (this.blockchain.length < nodeChain.length) {
            this.blockchain = nodeChain;
            console.log("Replaced blockchain with neighbours!");
            return;
          }
          return;
        })
        .catch((reason) => {
          console.log(`Error encountered: ${reason}`);
        });
    });
  }
}
