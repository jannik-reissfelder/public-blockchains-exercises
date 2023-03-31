////////////////////////////////////////////////////////////////////////
// Attention!
// You should not execute this file here, but rather copy it
// inside the scripts/ directory of a newly inited hardhat project.
////////////////////////////////////////////////////////////////////////


// Exercise 1. Add the Goerli Network.
//////////////////////////////////////

// Add the Goerli network by updating the hardhat.config.js file following
// the instructions here:
// https://hardhat.org/hardhat-runner/docs/config

// You should import the configuration from the .env file.

// Exercise 2. Deploy the Lock2 contract to Goerli.
////////////////////////////////////////////////////////

// a. Reduce the amount of locked Ether to 0.01 by modifying the "deploy2.js"
// script.
// Hint: Remember you need some Goerli ETH for this.
// https://goerlifaucet.com


// b. Set the default network to goerli or pass --network goerli option 
// to the deploy script. 
// Hint: The name of the network (e.g., "goerli") is specified by you in the
// hardhat.config file.

// c. Check the deployed Lock2 contract on Etherscan.
// https://goerli.etherscan.io/address/0x1dcedF653C1EdCaDd7F675F05eAa6afCf77cA507 

// d. Interact with it as you like.
require("dotenv").config()
const ethers = require("ethers")
const hre = require("hardhat");
console.log('Hardhat\'s default network:', hre.config.defaultNetwork);

// // Interact with your new Solidity contract (READ).
// ///////////////////////////////////////////////////////////////

// // to interact with a smart 
// // contract you need three pieces of information:
// // 1. The contract address.
// // 2. The ABI
// // 3. A signer (with access to a provider)

// // Update with your contract's name and address.
// // Hint: The address is known only after deployment.

const contractName = "Lock2";
const contractAddress = "0x1dcedF653C1EdCaDd7F675F05eAa6afCf77cA507"; // goerli ether contract address deployed before

// generate a signer, i.e. connect to wallet with ethers package, also together with goerli provider
// the signer is then used as input to query the contract

// goerli provider
const providerKey = process.env.INFURA_KEY;

const goerliInfuraUrl = `${process.env.INFURA_GOERLI}${providerKey}`;
const goerliProvider = new ethers.providers.JsonRpcProvider(goerliInfuraUrl);

// signer connection to provider
let privateKey = process.env.METAMASK_PRIVATE_KEY
const ethersigner = new ethers.Wallet(privateKey, goerliProvider);

console.log(ethersigner)

// Read and write ether contract from inside the main function
async function main() {
    const lock = await hre.ethers.getContractAt(contractName,
        contractAddress,
        ethersigner);  


    console.log(contractName + " address", lock.address);

    const readContract = async (lockContract = lock) => {
      
        // Print the owner of the lock.
        const owner = await lock.owner();
        console.log("Owner of " + contractName, owner);   
        let unlockTime = await lock.unlockTime();
        unlockTime = Number(unlockTime);
        console.log(contractName + " unlock timestamp:", unlockTime);
        let date = new Date((unlockTime * 1000));
        console.log(contractName + " unlock date:", date);
      };

    await readContract()


    const withdrawContract = async (lockContract = lock) => {

        // writing i.e. withdrawing

        let b1 = await ethersigner.getBalance();
        
        b1 = ethers.utils.formatEther(b1);
        console.log('The balance before withdrawing is ', b1);
    
        console.log("Withdrawing fom Lock");
        await lockContract.withdraw();
    
        let b2 = await ethersigner.getBalance();
        b2 = ethers.utils.formatEther(b2);
        console.log('The balance after withdrawing is ', b2);
      };

    // await withdrawContract()

}


// main().catch((error) => {
//         console.error(error);
//         process.exitCode = 1;
//       });


// Exercise 2. Verify your Goerli contract on Etherscan.
////////////////////////////////////////////////////////

// Make the source code of your contract verified:
// https://hardhat.org/hardhat-runner/docs/guides/verifying

// Check Etherscan again.

// how to verify 
// to console > npx hardhat verify --network goerli 0x1dcedF653C1EdCaDd7F675F05eAa6afCf77cA507 1680252236

// Exercise 3. Deploy the Lock2 contract to the (not) Uni Mannheim blockchain.
/////////////////////////////////////////////////////////////////////////////

// You know how to do it.

// However, there is no block explorer yet...


// Step1
// change in hardhat.config.js -->default network

// Step2 deploy with console
// > npx hardhat run scripts/deploy.js

// Get contract created from terminal output

uniMaAdress = '0xcAE9e527AC4Ffe55a5d97b757cF7aBE6cfbA9Ef0' // respective contract created on UNIMA


// as of this point I see that from my metamask account money was tranfered = 0.1 UniMaCoins

// However no way to check the contract in the UniMa network
// lets check it 



const notUniMaUrl = process.env.NOT_UNIMA_URL_1;
const notUniMaProvider = new ethers.providers.JsonRpcProvider(notUniMaUrl);

const contractAccount = uniMaAdress;

const checkTransaction = async () => {

    
    let b1 = await notUniMaProvider.getBalance(contractAccount);
    b1 = ethers.utils.formatEther(b1);
    console.log("Smart Contract:", contractAccount)
    console.log("has balance", b1)

}

checkTransaction()
