import * as dotenv from "dotenv";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

dotenv.config(); /* This loads the variables in your .env file to process.env */

const deploy = async () => {
  //   const { TEZOS_RPC_URL, ORIGINATOR_PRIVATE_KEY } = process.env;

  // const TEZOS_RPC_URL = "https://granadanet.api.tez.ie";
  const TEZOS_RPC_URL = "https://granadanet.smartpy.io/";
  const ORIGINATOR_PRIVATE_KEY =
    "edskS8un6ip9hX8UW74Xhv1Mkd8JwtqFEyNL1exQf2MaFxPLUEcKGvXVV2oXsNu6ntThG399fkp1rDXNj5uqX9tAh9w4jpfADb";
  console.log(TEZOS_RPC_URL, ORIGINATOR_PRIVATE_KEY);

  const signer = await InMemorySigner.fromSecretKey(ORIGINATOR_PRIVATE_KEY);
  const Tezos = new TezosToolkit(TEZOS_RPC_URL);
  Tezos.setProvider({ signer: signer });

  try {
    // code: require("../build/RegistrarMain.json"),
    // init: require("../build/RegistrarMain_storage.json")
    const { hash, contractAddress } = await Tezos.contract.originate({
      code: require("../build/RegistrarStorage.json"),
      init: require("../build/RegistrarStorage_storage.json")
    });

    console.log("Successfully deployed contract");
    console.log(`>> Transaction hash: ${hash}`);
    console.log(`>> Contract address: ${contractAddress}`);
  } catch (error) {
    console.log("IN ERROR", error);
  }
};

deploy();

// olive permit virtual that pretty rescue focus carbon judge sing brick merge license cupboard slim