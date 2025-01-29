import CampaignInfo from "@/components/campaign/CampaignInfo";

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
      <CampaignInfo address={campaignAddress} />
    </>
  );
}
