import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, internal } from "@ton/ton";
import { config } from "dotenv";

config();

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    return console.log("please provide MNEMONIC in .env file");
  }

  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  console.log("key:", key);
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
  console.log("Wallet address:", wallet.address);
  console.log("Derived Wallet address:", wallet.address.toString({ testOnly: true }));

  // initialize ton rpc client on testnet
  const endpoint = await getHttpEndpoint({ network: "testnet" });
  //   console.log("endpoint:", endpoint);
  const client = new TonClient({ endpoint });
  //   console.log("client:", client);

  // make sure wallet is deployed
  if (!(await client.isContractDeployed(wallet.address))) {
    return console.log("wallet is not deployed");
  }

  // send 0.05 TON to EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e
  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await walletContract.sendTransfer({
    secretKey: key.secretKey,
    seqno: seqno,
    messages: [
      internal({
        // to: "EQA4V9tF4lY2S_J-sEQR7aUj9IwW-Ou2vJQlCn--2DLOLR5e",
        to: "UQAGHa59ADAxFuRGY5MzKLL3ufnIg25BPfhT59FUNH0RP0p2",
        value: "0.05", // 0.05 TON
        body: "nowagain",
        bounce: false,
      }),
    ],
  });

  // wait until confirmed
  let currentSeqno = seqno;
  while (currentSeqno == seqno) {
    console.log("waiting for transaction to confirm...");
    await sleep(1500);
    currentSeqno = await walletContract.getSeqno();
  }
  console.log("transaction confirmed!");
}

main();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
