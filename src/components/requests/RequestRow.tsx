"use client";

import { type Request } from "@/hooks/useCampaignRequests";

import useWeb3 from "@/hooks/useWeb3";
import RowCell from "./RowCell";

export function RequestRow({
  index,
  request,
  approvers,
}: {
  index: number;
  request: Request;
  approvers: number;
}) {
  const web3 = useWeb3();

  return (
    <tr>
      <RowCell>{index + 1}</RowCell>
      <RowCell>{request.description}</RowCell>
      <RowCell>{web3?.utils.fromWei(request.value, "ether")}</RowCell>
      <RowCell>{request.recipient}</RowCell>
      <RowCell>
        {request.approvalCount}/{approvers}
      </RowCell>
      <RowCell>Approve</RowCell>
      <RowCell>Finalize</RowCell>
    </tr>
  );
}
