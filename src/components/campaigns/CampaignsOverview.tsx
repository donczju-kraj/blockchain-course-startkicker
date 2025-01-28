import getFactory from "@/utils/campaignFactoryInstance";
import getCampaigns from "@/utils/getCampaigns";
import CampaignsOverviewClient from "./CampaignsOverviewClient";

export default async function CampaignsOverview() {
  const factory = getFactory();
  const campaigns = await getCampaigns(factory);

  return <CampaignsOverviewClient campaigns={campaigns} />;
}
