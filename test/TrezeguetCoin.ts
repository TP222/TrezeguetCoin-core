const { expect } = require("chai");
const hre = require("hardhat");

describe("Whitelist", () => {
  it("Should add the address to the whitelist", async () => {
    // Deploy TrezeguetCoin contract
    const Contract = await hre.ethers.getContractFactory("TrezeguetCoin");
    const [owner] = await hre.ethers.getSigners();
    const contract = await Contract.deploy();

    // add owner's address to whitelist
    await contract.connect(owner).addToWhitelist(owner.address);

    // check if owner is whitelisted
    expect(await contract.whitelist(owner.address)).to.equal(true);
  });
});

describe("Mint", () => {
  it("Should mint 10M $TREZEG", async () => {
    // deploy TrezeguetCoin contract
    const Contract = await hre.ethers.getContractFactory("TrezeguetCoin");
    const [owner] = await hre.ethers.getSigners();
    const contract = await Contract.deploy();

    // add owner to whitelist
    await contract.connect(owner).addToWhitelist(owner.address);

    await contract.connect(owner).mint();

    const mintAmount = hre.ethers.utils.parseUnits("10000000", 18);

    const ownersBalance = await contract.balanceOf(owner.address);

    expect(ownersBalance).to.equal(mintAmount);
  });
});
