export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const campaignAddress = (await params).address;
  return (
    <>
      <h2>Campaign</h2>
      <p>{campaignAddress}</p>
    </>
  );
}
