// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log("entrance")
  // const ethAmount = "1"; // note this must match the value I have in my metamask account for UNI-Ma network
  const lockedAmount = hre.ethers.utils.parseEther("1");
  console.log("Working")

  const Lock = await hre.ethers.getContractFactory("MyERC20");
  console.log("Failed after")
  const lock = await Lock.deploy({ value: lockedAmount });
  console.log("Fail here")
  await lock.deployed();

  console.log(
    `Lock with ${ethAmount} ETH and deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
