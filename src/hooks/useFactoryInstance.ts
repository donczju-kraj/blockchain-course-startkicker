"use client";

import { useEffect, useState } from "react";
import { type Contract } from "web3-eth-contract";
import { campaignFactoryABI } from '@/utils/abis';

import useWeb3 from "./useWeb3";

export type CampaignFactoryContract = Contract<typeof campaignFactoryABI>

export default function useFactoryInstance(){
  const [instance, setInstance] = useState<CampaignFactoryContract | null>(null);

  const web3 = useWeb3();
  
  useEffect(() => {
    if(!web3) return;
    setInstance(new web3.eth.Contract(campaignFactoryABI, process.env.NEXT_PUBLIC_FACTORY_ADDRESS));
  }, [web3]);

  return instance;
}