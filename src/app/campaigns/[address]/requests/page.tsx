import RequestsTable from "@/components/requests/RequestsTable";
import MyLink from "@/components/commons/MyLink";
import AddCircle from "@/components/icons/AddCircle";
import BackArrow from "@/components/icons/BackArrow";

export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const campaignAddress = (await params).address;

  return (
    <section className="flex flex-col space-y-6">
      <div className="flex justify-between">
        <h4 className="text-xl font-semibold">
          Pending requests for:{" "}
          <span className="text-lg italic">{campaignAddress}</span>
        </h4>
        <MyLink
          className="flex space-x-2 items-center"
          href={`/campaigns/${campaignAddress}`}
        >
          <p>Back to campaign details</p>
          <BackArrow />
        </MyLink>
      </div>

      <div className="flex">
        <MyLink
          className="flex space-x-2 items-center"
          href={`/campaigns/${campaignAddress}/requests/new`}
        >
          <AddCircle size={20} fill="fill-gray-200" />
          <p>Add new request</p>
        </MyLink>
      </div>

      <RequestsTable address={campaignAddress} />
    </section>
  );
}
