const path = require("path");
const fs = require("fs");
const solc = require("solc");

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
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
const contract = compiled.contracts['Campaign.sol'].Campaign;

module.exports = contract;
