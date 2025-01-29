'use client';

import { useState, useEffect } from "react";

import useCampaign from "./useCampaign";
import useWeb3 from "./useWeb3";

interface RequestData {
  0: string,
  1: string,
  2: string,
  3: string,
  4: string,
  approvalCount: string,
  complete: boolean,
  description: string,
  recipient: string,
  value: string,
}

export interface Request {
  approvalCount: string,
  complete: boolean,
  description: string,
  recipient: string,
  value: string,
}

export default function useCamapignRequests(address: string){
  const [requests, setRequests] = useState<Request[]>();
  const campaign = useCampaign(address);
  const web3 = useWeb3();

  useEffect(() => {
    const fetchRequests = async () => {
      if(!(campaign && web3)) return;
      const requestsCount: string = await campaign.methods.getRequestsCount().call();

      const requestsArr = await Promise.all<RequestData>(
        Array(web3.utils.toNumber(requestsCount))
          .fill(0)
          .map((el, index) => {
            return campaign.methods.requests(index).call();
          })
      );

      setRequests(requestsArr.map(req => ({
        approvalCount: req.approvalCount,
        complete: req.complete,
        description: req.description,
        recipient: req.recipient,
        value: req.value
      })));
  }

    fetchRequests()
  }, [campaign, web3]);

  return { requests };
}