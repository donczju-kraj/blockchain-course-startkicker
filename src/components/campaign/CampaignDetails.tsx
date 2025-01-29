"use client";

import { useState, useEffect } from "react";

import useWeb3 from "@/hooks/useWeb3";
import useCampaign from "@/hooks/useCampaign";
import { getErrorMessage } from "@/utils/utils";

interface DetailsData {
  0: string;
  1: string;
  2: number;
  3: number;
  4: string;
}

interface CampaignDetails {
  minimumContribution: string;
  balance: string;
  requestsCount: number;
  approversCount: number;
  manager: string;
}

interface CampaignDetailProps {
  value: string | number | undefined;
  header: string;
  description: string;
}

function CampaignDetail({ value, header, description }: CampaignDetailProps) {
  return (
    <div className="flex flex-col justify-between px-4 py-3 border border-gray-200 bg-gray-800 rounded-xl">
      <p className="font-semibold break-words">{value}</p>
      <div>
        <p className="text-lg font-semibold">{header}</p>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default function CampaignDetails({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);
  const web3 = useWeb3();
  const campaign = useCampaign(address);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      const accounts = await web3?.eth.getAccounts();
      if (accounts && campaign) {
        try {
          const details: DetailsData = await campaign.methods
            .getSummary()
            .call({
              from: accounts[0],
            });
          setCampaignDetails({
            minimumContribution: details[0],
            balance: details[1],
            requestsCount: details[2],
            approversCount: details[3],
            manager: details[4],
          });
        } catch (error) {
          const errMessage: string = getErrorMessage(error);
          console.log("Failed to load campaign details.", errMessage);
        }
      }
    };
    fetchCampaignDetails();
  }, [campaign]);

  return (
    <section className={className}>
      <h4 className="text-xl font-semibold mb-4">Campaign details</h4>
      <div className="grid grid-cols-2 gap-6">
        <CampaignDetail
          value={campaignDetails?.manager}
          header="Address of manager"
          description="The manager created this campaign and can create requests to withdraw money."
        />

        <CampaignDetail
          value={campaignDetails?.minimumContribution}
          header="Minimum contribution [wei]"
          description="Minimum amount of wei you need contribute to become approver."
        />

        <CampaignDetail
          value={campaignDetails?.requestsCount}
          header="Number of requests"
          description="A request tries to withdraw money from the contract. Request must be approved by the approvers."
        />

        <CampaignDetail
          value={campaignDetails?.approversCount}
          header="Number of approvers"
          description="Number of people who have already donated to this campaign."
        />

        <CampaignDetail
          value={campaignDetails?.balance}
          header="Campaign balance [ether]"
          description="The balance is how much money this campaign has left to spend."
        />
      </div>
    </section>
  );
}
