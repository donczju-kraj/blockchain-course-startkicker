const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try {
    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: '5000000', from: accounts[0] });
  
    console.log("Contract deployed to", result.options.address);
  } catch (error) {
    console.error('Deployment failed with error:', error.message || error);
  } finally {
    provider.engine.stop();
  }
};
deploy();
