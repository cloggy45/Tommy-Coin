export type Address = string;

export class NodeService {
  nodes: Address[] = [];

  registerNode(address: Address) {
    const nodeAddress = new URL(address);

    this.nodes.push(nodeAddress.toString());
  }

  getRegisteredNodes() {
    return this.nodes;
  }
}
