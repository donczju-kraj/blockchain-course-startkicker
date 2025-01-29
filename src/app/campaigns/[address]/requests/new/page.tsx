import MyLink from "@/components/commons/MyLink";
import BackArrow from "@/components/icons/BackArrow";
import AddRequestForm from "@/components/forms/AddRequestForm";

export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const campaignAddress = (await params).address;
  return (
    <section className="flex flex-col space-y-8 items-center">
      <h3 className="text-xl font-semibold">Create new request</h3>

      <AddRequestForm address={campaignAddress} />

      <MyLink
        className="flex space-x-2 w-fit items-center"
        href={`/campaigns/${campaignAddress}/requests`}
      >
        <p>Back to requests</p>
        <BackArrow />
      </MyLink>
    </section>
  );
}
