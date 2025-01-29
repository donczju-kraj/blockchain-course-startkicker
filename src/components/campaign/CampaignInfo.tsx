"use client";

import useCampaignDetails from "@/hooks/useCampaignDetails";
import CampaignDetailsView from "./CampaignDetailsView";
import ContributeToCampaign from "./ContributeToCampaign";

export default function CampaignInfo({ address }: { address: string }) {
  useCampaignDetails(address);
  return (
    <div className="grid grid-cols-3 gap-6">
      <CampaignDetailsView address={address} className="col-span-2" />
      <ContributeToCampaign address={address} />
    </div>
  );
}
