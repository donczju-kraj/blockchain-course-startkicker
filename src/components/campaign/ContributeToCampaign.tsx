import ContributeForm from "../forms/ ContributeForm";

export default function ContributeToCampaign({ address }: { address: string }) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">
        Contribute to this campaign!
      </h4>
      <ContributeForm campaignAddress={address} />
    </div>
  );
}
