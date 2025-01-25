const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');


const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

const web3 = new Web3(ganache.provider());

const weiToEtherFloat = (valueInWei) => {
  valueInEther = web3.utils.fromWei(valueInWei, 'ether');
  return parseFloat(valueInEther);
}

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send({from: accounts[0], gas: '10000000'});

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
})

describe('Campaigns', async () => {
  it('deploys a factory', () => {
    assert.ok(factory.options.address);
  })

  it('factory deploys a campaign', () => {
    assert.ok(campaign.options.address);
  })

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert(accounts[0], manager);
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '150'
    })
    const isContributor = await campaign.methods.approvers(accounts[1]);
    assert.ok(isContributor);
  })

  it('requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '50'
      });
      assert(false);
    } catch(error) {
      assert(error);
    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest(
      'Buy batteries', '100', accounts[9]
    ).send({
      from: accounts[0],
      gas: '1000000'
    })

    const request = await campaign.methods.getRequest(0).call();
    assert.equal('Buy batteries', request.description);
    assert.equal('100', request.value);
    assert.equal(accounts[9], request.recipient);
  })

  it('processes request', async () => {
    const initialBalance = await web3.eth.getBalance(accounts[9]);
    const etherSent = 5;

    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei(10, 'ether')
    });

    await campaign.methods.createRequest(
      'Buy batteries', web3.utils.toWei(etherSent, 'ether'), accounts[9]
    ).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '100000'
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    const finalBalance = await web3.eth.getBalance(accounts[9]);

    assert(weiToEtherFloat(finalBalance) > weiToEtherFloat(initialBalance) + etherSent - 0.1);
  })
})
