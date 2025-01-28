"use client";

import Link from "next/link";

export default function CampaignCard({
  campaignAddress,
  index,
}: {
  campaignAddress: string;
  index: number;
}) {
  return (
    <div className="px-3 py-2 space-y-2 rounded-xl bg-gray-200 text-gray-900">
      <div className="flex justify-between">
        <p className="font-semibold text-lg">{index + 1}. Campaign </p>
        <Link
          className="text-blue-700 font-semibold text-sm hover:underline hover:text-blue-800"
          href={`/campaigns/${campaignAddress}`}
        >
          View campaign
        </Link>
      </div>
      <div>
        <p className="font-semibold">Campaign address:</p>
        <p className="text-sm italic">{campaignAddress}</p>
      </div>
    </div>
  );
}
