import ethProvider from "eth-provider";
import hre from "hardhat";

const frame = ethProvider("frame");

(async () => {
  const TrezeguetCoin = await hre.ethers.getContractFactory("TrezeguetCoin");
  const tx = TrezeguetCoin.getDeployTransaction();
  const adresses = (await frame.request({
    method: "eth_requestAccounts",
  })) as string[];
  console.log(adresses);
  tx.from = adresses[0];
  await frame.request({ method: "eth_sendTransaction", params: [tx] });
})();
