import express from "express";
import { AptosClient, AptosAccount } from "aptos";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com/v1";
const MODULE_ADDRESS = process.env.MODULE_ADDRESS || "0xYourDeployedContractAddress";
const PRIVATE_KEY_HEX = process.env.DEPLOYER_PRIVATE_KEY || "";

const aptosClient = new AptosClient(NODE_URL);
const deployer = AptosAccount.fromPrivateKeyHex(PRIVATE_KEY_HEX);

// Issue certification endpoint
app.post("/api/issue_certification", async (req, res) => {
  try {
    const { studentAddress, courseName, metadataUri, skills, grade } = req.body;

    if (!studentAddress || !courseName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const payload = {
      type: "entry_function_payload",
      function: `${MODULE_ADDRESS}::MicroCertification::issue_certification`,
      type_arguments: [],
      arguments: [studentAddress, courseName, metadataUri || "", skills || [], grade || ""],
    };

    const txnRequest = await aptosClient.generateTransaction(deployer.address(), payload);
    const signedTxn = await aptosClient.signTransaction(deployer, txnRequest);
    const resSubmit = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(resSubmit.hash);

    res.json({ message: "Certification issued successfully", txnHash: resSubmit.hash });
  } catch (error) {
    console.error("Error issuing certification:", error);
    res.status(500).json({ error: "Failed to issue certification" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Aptos certification API listening on port ${PORT}`);
});
