"use client";

import useCampaignDetails from "@/hooks/useCampaignDetails";
import CampaignDetailsView from "./CampaignDetailsView";
import ContributeToCampaign from "./ContributeToCampaign";

export default function CampaignInfo({ address }: { address: string }) {
  const { refreshCampaignDetails } = useCampaignDetails(address);
  return (
    <div className="grid grid-cols-3 gap-6">
      <CampaignDetailsView className="col-span-2" />
      <ContributeToCampaign
        refresh={refreshCampaignDetails}
        address={address}
      />
    </div>
  );
}
