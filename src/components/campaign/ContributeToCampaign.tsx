import ContributeForm from "../forms/ ContributeForm";

interface ContributeToCampaignProps {
  address: string;
  refresh: () => void;
}

export default function ContributeToCampaign({
  address,
  refresh,
}: ContributeToCampaignProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">
        Contribute to this campaign!
      </h4>
      <ContributeForm refresh={refresh} campaignAddress={address} />
    </div>
  );
}
