import CampaignDetails from "@/components/campaign/CampaignDetails";
import ContributeToCampaign from "@/components/campaign/ContributeToCampaign";

export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const campaignAddress = (await params).address;
  return (
    <>
      <div className="flex items-end mb-4 space-x-2">
        <h2 className="text-xl font-semibold">Campaign at:</h2>
        <p className="italic">{campaignAddress}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <CampaignDetails className="col-span-2" />
        <ContributeToCampaign />
      </div>
    </>
  );
}
