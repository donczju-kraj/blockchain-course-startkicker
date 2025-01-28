"use client";

import { useEffect, useState } from "react";

import { campaignFactoryABI } from '@/utils/abis';
import { CampaignFactoryContract } from "@/utils/campaignFactoryInstance";

import web3 from "@/utils/web3instance";

export default function useFactory(){
  const [contract, setContract] = useState<CampaignFactoryContract | null>(null);
  
  useEffect(() => {
    if(!web3) return;
    setContract(new web3.eth.Contract(campaignFactoryABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS));
  }, [web3]);

  return contract;
}