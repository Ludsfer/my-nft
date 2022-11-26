require('dotenv').config();
const ethers = require('ethers');
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");


// Get Alchemy API Key and Contract Address
const { ALCHEMY_API_KEY, CONTRACT_ADDRESS, PRIVATE_KEY } = process.env;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('maticmum', ALCHEMY_API_KEY)

// Print the contract ABI (Application Binary Interface)
// console.log(`The contract ABI (Application Binary Interface): ${JSON.stringify(contract.abi)}`);
// Print the contract ABI (Application Binary Interface) on the command line use
// node scripts/mint-nft.js


// Create a signer
const privateKey = PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = CONTRACT_ADDRESS

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmXTvBaphH2cBScrSESfsXYWEoshASj3qZz4GYE9MEsUtz"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });