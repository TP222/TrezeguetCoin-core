import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    bsctestnet: {
      url: "https://bsc-testnet.publicnode.com",
    },
  },
};

export default config;
