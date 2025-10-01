import { AptosClient, AptosAccount, FaucetClient, TxnBuilderTypes, BCS } from "aptos";

// Configuration
const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1"; // or your network
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
const MODULE_ADDRESS = "0xYourDeployedModuleAddress";
const PRIVATE_KEY_HEX = "your-private-key-hex-here"; // For signing transactions

// Initialize aptos client and faucet client
const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

// Initialize deployer account
const deployer = AptosAccount.fromPrivateKeyHex(PRIVATE_KEY_HEX);

async function batchIssueCertificates() {
  // Fund deployer just in case
  console.log("Funding deployer account...");
  await faucetClient.fundAccount(deployer.address(), 100_000_000);

  // List of certificates to issue
  const certificates = [
    {
      studentAddress: "0x1234...abcd",
      courseName: "Blockchain Fundamentals",
      metadataUri: "ipfs://QmExampleUri1",
      skills: ["Blockchain", "DLT", "Cryptography"],
      grade: "A+",
    },
    {
      studentAddress: "0xab12...cd34",
      courseName: "Smart Contract Development",
      metadataUri: "ipfs://QmExampleUri2",
      skills: ["Move", "Smart Contracts"],
      grade: "A",
    },
  ];

  for (const cert of certificates) {
    try {
      console.log(`Issuing certificate to ${cert.studentAddress} for course: ${cert.courseName}`);

      // Build payload for your issue_certification entry function
      const payload = {
        type: "entry_function_payload",
        function: `${MODULE_ADDRESS}::MicroCertification::issue_certification`,
        type_arguments: [],
        arguments: [cert.studentAddress, cert.courseName, cert.metadataUri, cert.skills, cert.grade],
      };

      // Submit transaction
      const txnHash = await client.generateTransaction(deployer.address(), payload);
      const signedTxn = await client.signTransaction(deployer, txnHash);
      const res = await client.submitTransaction(signedTxn);
      await client.waitForTransaction(res.hash);

      console.log(`Certificate issued successfully with txn hash: ${res.hash}`);
    } catch (error) {
      console.error("Failed to issue certificate:", error);
    }
  }
}

batchIssueCertificates();
