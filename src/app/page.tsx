import CampaignsOverview from "@/components/campaigns/CampaignsOverview";

export default function Home() {
  return (
    <>
      <h2 className="text-center mb-6 text-2xl font-semibold">
        Campaigns menu
      </h2>
      <div className="border border-gray-200 bg-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center space-y-4">
        <CampaignsOverview />
      </div>
    </>
  );
}
