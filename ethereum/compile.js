const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const CONTRACTS_FILE_NAME = "Campaign.sol"

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", CONTRACTS_FILE_NAME);
const source = fs.readFileSync(campaignPath, "utf8");

const inputSources = {};
inputSources[CONTRACTS_FILE_NAME] = {content: source};

const input = {
  language: 'Solidity',
  sources: inputSources,
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

const output = solc.compile(JSON.stringify(input));
const compiled = JSON.parse(output);

fs.ensureDirSync(buildPath);

for(let contract in compiled.contracts[CONTRACTS_FILE_NAME]){
  fs.outputJSONSync(
    path.resolve(buildPath, contract + '.json'),
    compiled.contracts[CONTRACTS_FILE_NAME][contract]
  )
}
