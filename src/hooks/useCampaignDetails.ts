'use client';

import { useState, useEffect } from "react";

import useWeb3 from "./useWeb3";
import useCampaign from "./useCampaign";
import { useCampaignStore } from "./useCampaignStore";
import { getErrorMessage } from "@/utils/utils";

export interface CampaignDetails {
  minimumContribution: string;
  balance: string;
  requestsCount: number;
  approversCount: number;
  manager: string;
}

interface DetailsData {
  0: string;
  1: string;
  2: number;
  3: number;
  4: string;
}

export default function useCampaignDetails(address: string){
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const web3 = useWeb3();
  const campaign = useCampaign(address);

  const refreshCampaignDetails = () => setRefreshTrigger(prev => prev + 1);

  const setCampaignDetails = useCampaignStore(state => state.setCampaignDetails);

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
  }, [campaign, refreshTrigger]);
  return { refreshCampaignDetails };
}