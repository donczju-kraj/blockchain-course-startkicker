import { type CampaignFactoryContract } from "./campaignFactoryInstance";
import { type Address } from "web3";

const getCampaigns = async (factory: CampaignFactoryContract) => {
  const campaigns: Address[] = await factory.methods.getDeployedCampaigns().call();
  return campaigns;
}

export default getCampaigns;