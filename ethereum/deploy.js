const { ethers } = require("ethers");
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();

const deploy = async () => {
  const mnemonic = process.env.MNEMONIC;
  const infuraUrl = process.env.INFURA_API_KEY;

  const provider = new ethers.JsonRpcProvider(infuraUrl);
  const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(provider);

  console.log('Attempting to deploy from account', wallet.address);

  try {
    const factory = new ethers.ContractFactory(
      compiledFactory.abi,
      compiledFactory.evm.bytecode.object,
      wallet
    );

    const contract = await factory.deploy({
      gasLimit: 5000000,
    });
    console.log("Contract deployed to", contract.target);
  } catch (error) {
    console.error('Deployment failed with error:', error.message || error);
  } finally {
    provider.engine.stop();
  }
};
deploy();
