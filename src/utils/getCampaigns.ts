import { CampaignFactoryContract } from "./campaignFactoryInstance";

const getCampaigns = async (factory: CampaignFactoryContract): Promise<string[]> => {
  try {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return campaigns as string[];
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    throw error;
  }
};

export default getCampaigns;