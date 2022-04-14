import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
require('solidity-coverage')

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken contract", function () {

  let owner: SignerWithAddress
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  let token: Contract
  let MyToken: ContractFactory
  
  beforeEach(async ()=>{
    [owner, user1, user2] = await ethers.getSigners()
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy("name", "symbol");
    await token.deployed();
  })

  it("Should return name", async function () {
    expect(await token.name()).to.be.equal("name")
  })

  it("Should return symbol", async function () {
    expect(await token.symbol()).to.be.equal("symbol")
  })

  it("Should return decimals", async function () {
    expect(await token.decimals()).to.be.equal(18)
  })

  it("Should return totalSuply", async function () {
    expect(await token.totalSupply()).to.be.equal(0)
  })

  it("Should return balance of owner", async function () {
    expect(await token.balanceOf(owner.address)).to.be.equal(0)
  })

  it("Should transfer from owner to user1", async function () {
    await token.transfer(user1.address, 10);
    expect(await token.balanceOf(user1.address)).to.be.equal(10)
  })

  it("Should transfer from owner to user2 by user1", async function () {
    await token.approve(user1.address, 10);
    await token.transferFrom(owner.address, user2.address, 10);
    await token.mint(owner.address, 10);
    expect(await token.balanceOf(user2.address)).to.be.equal(10)
    expect(await token.balanceOf(owner.address)).to.be.equal(0)
  })

  it("Should return allowance for user1", async function () {
    await token.approve(user1.address, 10);
    expect(await token.allowance(owner.address, user1.address)).to.be.equal(10)
  })

  it("Should burn total supply", async function () {
    var tmpSupply = (await token.totalSupply())
    await token.mint(user1.address, 10);
    await token.burn(owner.address, 5)
    expect(await token.totalSupply()).to.be.equal(tmpSupply + 10 - 5);
  })

});
