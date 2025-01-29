"use client";

import { useEffect, useState } from "react";
import { type Contract } from "web3-eth-contract";
import web3 from "@/utils/web3instance";

import { campaignABI } from "@/utils/abis";

export type CampaignContract = Contract<typeof campaignABI>;

export default function useCampaign(campaignAddress: string){
  const [contract, setContract] = useState<CampaignContract | null>(null);
 
  useEffect(() => {
    if(!web3) return;
    const campaignContract = new web3.eth.Contract(campaignABI, campaignAddress);
    setContract(campaignContract);
  }, [web3]);

  return contract;
}