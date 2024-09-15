const { ethers, network } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contract with wallet ${deployer.address} on network: ${network.name}`);

    // Deploy the ClothingSubmission contract
    console.log('Deploying ClothingSubmission contract...');
    const ClothingSubmission = await ethers.getContractFactory('ClothingSubmission');
    const clothingSubmissionInstance = await ClothingSubmission.deploy();
    await clothingSubmissionInstance.waitForDeployment();
    console.log(clothingSubmissionInstance)

    const clothingSubmissionAddress = clothingSubmissionInstance.target;
    //console.log(`ClothingSubmission deployed to: ${clothingSubmissionAddress}`);

    // Optionally: If you want to do some post-deployment actions, like initializing or calling a function
    // You can do that here (uncomment if needed)
    /*
    const tx = await clothingSubmissionInstance.someFunction();
    await tx.wait();
    console.log('Function call completed.');
    */
    // Call increaseCounter function

    // Save the contract address to the configuration file
    const configFile = path.resolve(__dirname, 'contracts-config.json');
    const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    config.ClothingSubmission = clothingSubmissionInstance.target;
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

    console.log('Deployment completed successfully.');
}

// Handle async errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});