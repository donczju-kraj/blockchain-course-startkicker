import { type Contract } from "web3-eth-contract";
import web3 from "./web3instance";
import { campaignFactoryABI } from '@/utils/abis';

export type CampaignFactoryContract = Contract<typeof campaignFactoryABI>;

const getFactory = () => {
  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;

  if (!factoryAddress) {
    throw new Error("Factory address is not defined in environment variables.");
  }

  const factory: CampaignFactoryContract = new web3.eth.Contract(
    campaignFactoryABI,
    factoryAddress
  );
  return factory;
};

export default getFactory;