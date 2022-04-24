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
