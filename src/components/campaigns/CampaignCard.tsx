"use client";
export default function CampaignCard({
  campaignAddress,
}: {
  campaignAddress: string;
}) {
  return (
    <div className="px-3 py-2 space-y-2 rounded-xl bg-gray-200 text-gray-900">
      <p className="font-semibold text-lg">Campaign name:</p>
      <p>
        Campaign address: <span className="italic">{campaignAddress}</span>
      </p>
    </div>
  );
}
