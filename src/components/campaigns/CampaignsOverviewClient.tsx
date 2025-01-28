"use client";

import useFactory from "@/hooks/useFactory";
import CampaignCard from "./CampaignCard";
import AddCampaign from "./AddCampaign";

interface CampaignsOverviewClientProps {
  campaigns: string[];
}

export default function CampaignsOverviewClient({
  campaigns,
}: CampaignsOverviewClientProps) {
  const factory = useFactory();
  return (
    <div>
      <p className="text-xl font-semibold mb-2">Campaigns:</p>
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <CampaignCard key={campaign} campaignAddress={campaign} />
        ))
      ) : (
        <p>No campaigns found</p>
      )}
      <AddCampaign />
    </div>
  );
}
