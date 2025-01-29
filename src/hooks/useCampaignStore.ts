import { create } from 'zustand';

import { type CampaignDetails } from './useCampaignDetails';

export const useCampaignStore = create((set) => ({
  campaignDetails: {
    minimumContribution: '0',
    balance: '0',
    requestsCount: 0,
    approversCount: 0,
    manager: '',
  },
  setCampaignDetails: (newCampaignDetails: CampaignDetails) => (set({campaignDetails: newCampaignDetails}))
}))