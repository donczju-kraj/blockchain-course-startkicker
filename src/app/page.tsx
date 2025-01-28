import CampaignsOverview from "@/components/campaigns/CampaignsOverview";

export default function Home() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-gray-900 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-semibold">Campaigns menu</h1>
      <CampaignsOverview />
    </div>
  );
}
