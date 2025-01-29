"use client";

import CampaignCard from "./CampaignCard";
import AddCampaign from "./AddCampaign";

interface CampaignsOverviewClientProps {
  campaigns: string[];
}

export default function CampaignsOverviewClient({
  campaigns,
}: CampaignsOverviewClientProps) {
  return (
    <div className="grid grid-cols-3 gap-4 items-start">
      <div className="col-span-2 border border-gray-200 px-4 py-3 rounded-xl bg-gray-800">
        <p className="text-xl font-semibold mb-2">Open campaigns:</p>
        <div className="space-y-3">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign}
                index={index}
                campaignAddress={campaign}
              />
            ))
          ) : (
            <p className="text-xl">No campaigns found...</p>
          )}
        </div>
      </div>
      <AddCampaign />
    </div>
  );
}
