"use client";

import useCamapignRequests, { type Request } from "@/hooks/useCampaignRequests";
import useCampaignDetails, {
  type CampaignDetails,
} from "@/hooks/useCampaignDetails";
import { useCampaignStore } from "@/hooks/useCampaignStore";

import { RequestRow } from "./RequestRow";
import HeaderCell from "./HeaderCell";

export default function RequestsTable({ address }: { address: string }) {
  const { requests } = useCamapignRequests(address);
  useCampaignDetails(address);
  const campaignDetails: CampaignDetails = useCampaignStore(
    (state) => state.campaignDetails
  );

  if (!requests) return <></>;

  return (
    <>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="h-14">
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount [eth]</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {requests.map((req: Request, i: number) => {
            return (
              <RequestRow
                key={i}
                index={i}
                request={req}
                approvers={campaignDetails.approversCount}
                address={address}
              />
            );
          })}
        </tbody>
      </table>
      <p className="text-sm">Found {requests.length} requests.</p>
    </>
  );
}
