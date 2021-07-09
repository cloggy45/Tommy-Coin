import elliptic from "elliptic";
const ec = new elliptic.ec("secp256k1");

export function generatePair() {
  const keypair = ec.genKeyPair();
  return {
    publicKey: keypair.getPublic("hex"),
    privateKey: keypair.getPrivate("hex"),
  };
}

export function sign(message: string, privateKey: string) {
  try {
    const keypair = ec.keyFromPrivate(privateKey, "hex");
    return keypair.sign(message).toDER("hex");
  } catch (error) {
    return "invalid signature";
  }
}

export function verifySignature(
  message: string,
  signature: string,
  publicKey: string
) {
  try {
    const keypair = ec.keyFromPublic(publicKey, "hex");
    return ec.verify(message, signature, keypair, "hex");
  } catch (error) {
    return false;
  }
}

// TODO Store these keys externally so we don't lose them each time we run the miner.
console.log("Generating Miners Keys");
export const minersKeys = generatePair();
