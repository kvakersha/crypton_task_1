import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { Contract, ContractFactory } from "ethers";


dotenv.config();

task("approve", "approve amount")
  .addParam("contract")
  .addParam("to")
  .addParam("value")
  .setAction(async (args, hre) => {
    const Token = await hre.ethers.getContractFactory("MyToken")
    const token = await Token.attach(args.contract)

    return await token.approve(args.to, args.value)
  });

task("transfer", "transfer amount")
  .addParam("contract")
  .addParam("to")
  .addParam("value")
  .setAction(async (args, hre) => {
    const Token = await hre.ethers.getContractFactory("MyToken")
    const token = await Token.attach(args.contract)

    return await token.transfer(args.to, args.value)
  });

task("transferFrom", "transfer amount")
  .addParam("contract")
  .addParam("from")
  .addParam("to")
  .addParam("value")
  .setAction(async (args, hre) => {
    const Token = await hre.ethers.getContractFactory("MyToken")
    const token = await Token.attach(args.contract)

    return await token.transferFrom(args.from, args.to, args.value)
  });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
