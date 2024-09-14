// scripts/test_increaseCounter.js
const fs = require('fs');
const path = require('path');
//const CONTRACT_ADDRESS = '0x3f7b6ea26bb553a7bd9cc195642ca61e6ed79772'; // Replace with your existing contract address

async function main() {
    const configFile = path.resolve(__dirname, 'contracts-config.json');
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    const CONTRACT_ADDRESS = config.ClothingSubmission;
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with the contract using the account:", deployer.address);

    // Get the contract instance using the existing address
    const ClothingSubmissionFactory = await ethers.getContractFactory("ClothingSubmission");
    const clothingSubmission = ClothingSubmissionFactory.attach(CONTRACT_ADDRESS);

    // Call increaseCounter function
    let tx = await clothingSubmission.submitPhoto('Shirt',
        'Zara',
        'Cotton',
        'image.jpg',
        'This is nice.');
    await tx.wait(); // Wait for the transaction to be mined
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

