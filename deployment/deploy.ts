import * as dotenv from "dotenv";
import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";

dotenv.config(); /* This loads the variables in your .env file to process.env */

const deploy = async () => {
  //   const { TEZOS_RPC_URL, ORIGINATOR_PRIVATE_KEY } = process.env;

  const TEZOS_RPC_URL = "https://granadanet.api.tez.ie";
  const ORIGINATOR_PRIVATE_KEY =
    "edskS1iD24NRtKU2D3mU4oiLXcLkbiXFDgtoePZWsN6AmDPKP1apXQXzMw4C81diawkbyNj9Q6qe9ow4frznq4HE5NbRsZwH4a";
  console.log(TEZOS_RPC_URL, ORIGINATOR_PRIVATE_KEY);

  const signer = await InMemorySigner.fromSecretKey(ORIGINATOR_PRIVATE_KEY);
  const Tezos = new TezosToolkit(TEZOS_RPC_URL);
  Tezos.setProvider({ signer: signer });

  try {
    const { hash, contractAddress } = await Tezos.contract.originate({
      code: require("../build/RegistrarMain.json"),
      init: require("../build/RegistrarMain_storage.json")
    });

    console.log("Successfully deployed contract");
    console.log(`>> Transaction hash: ${hash}`);
    console.log(`>> Contract address: ${contractAddress}`);
  } catch (error) {
    console.log(error);
  }
};

deploy();
