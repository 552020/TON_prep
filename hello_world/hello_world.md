# TON Hello World I

https://tonhelloworld.com/01-wallet/

Step by step guide for working with your first TON wallet: create one and access it programmatically

Step 1: Create a new **wallet** using an app
Step 2: Backup the 24 word **recovery phrase**
Step 3: View the wallet by address in an **explorer**
https://testnet.tonscan.org/
Step 4: Fund and deploy your wallet contract

Not so easy, you basically need to send a test transaction: it means to switch your wallet to developer mood and change the net to the testnet. Find a valid address to which you can send the TONS. The address of the wallet: https://wallet.tonkeeper.com/. Then go to settings and click 5x on the logo on the bottom to enter dev mode. Switch net to the testnet and finally enter this address EQChHpu8-rFBQyVCXJtT1aTwODTBc1dFUAEatbYy11ZLcBST. Recheck the explorer.

Step 6: Set up your local machine for coding

```ts
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";
import { config } from "dotenv";
config();

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error("Please provide a mnemonic in the .env file");
  }

  // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // print wallet address
  console.log(wallet.address.toString({ testOnly: true }));

  // print wallet workchain
  console.log("workchain:", wallet.address.workChain);
}

main();
```

Step 8: Read wallet state from the chain

- npm init -y
- npm install @ton/ton @ton/crypto @ton/core ts-node @orbs-network/ton-access

## Glossary

- TON Blockchain
- TON coin
- Explorers: https://ton.app/explorers
- RPC service provider: a provider that runs TON Blockchain nodes and allow us to communicate with them over HTTP
