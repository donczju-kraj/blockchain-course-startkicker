"use client";

import toast from "react-hot-toast";
import clsx from "clsx";

import { type Request } from "@/hooks/useCampaignRequests";
import useWeb3 from "@/hooks/useWeb3";
import useCampaign from "@/hooks/useCampaign";
import RowCell from "./RowCell";
import Button from "../button/Button";
import { getErrorMessage } from "@/utils/utils";

export function RequestRow({
  index,
  request,
  approvers,
  address,
}: {
  index: number;
  request: Request;
  approvers: number;
  address: string;
}) {
  const web3 = useWeb3();
  const campaign = useCampaign(address);

  const readyToFinalize = Number(request.approvalCount) > Number(approvers) / 2;

  const onApprove = async () => {
    if (campaign && web3) {
      const accounts = await web3.eth.getAccounts();
      try {
        await campaign.methods.approveRequest(index).send({
          from: accounts[0],
        });
        toast.success("Campaign approved");
      } catch (error: unknown) {
        const errMsg = getErrorMessage(error);
        console.log("Failed to approve campaign", errMsg);
        toast.error("Failed to approve campaign");
      }
    }
  };

  const onFinalize = async () => {
    if (campaign && web3) {
      const accounts = await web3.eth.getAccounts();
      try {
        await campaign.methods.finalizeRequest(index).send({
          from: accounts[0],
        });
        toast.success("Campaign approved");
      } catch (error: unknown) {
        const errMsg = getErrorMessage(error);
        console.log("Failed to finalize campaign", errMsg);
        toast.error("Failed to finalize campaign");
      }
    }
  };

  return (
    <tr
      className={clsx("h-12", request.complete ? "bg-gray-600" : "bg-gray-700")}
    >
      <RowCell>{index + 1}</RowCell>
      <RowCell>{request.description}</RowCell>
      <RowCell>{web3?.utils.fromWei(request.value, "ether")}</RowCell>
      <RowCell>{request.recipient}</RowCell>
      <RowCell>
        {request.approvalCount}/{approvers}
      </RowCell>
      <RowCell>
        <Button disabled={request.complete} onClick={onApprove} version="green">
          Approve
        </Button>
      </RowCell>
      <RowCell>
        <Button
          disabled={request.complete || !readyToFinalize}
          onClick={onFinalize}
          version="red"
        >
          Finalize
        </Button>
      </RowCell>
    </tr>
  );
}
