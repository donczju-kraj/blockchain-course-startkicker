import getFactory from "@/utils/campaignFactoryInstance";
import getCampaigns from "@/utils/getCampaigns";
import { type Address } from "web3";

export default async function CampaignsOverview() {
  const factory = getFactory();
  const campaigns: Address[] = await getCampaigns(factory);

  return (
    <div>
      <p>Some campaigns data to be shown here</p>
      <p>{campaigns[0]}</p>
    </div>
  );
}
