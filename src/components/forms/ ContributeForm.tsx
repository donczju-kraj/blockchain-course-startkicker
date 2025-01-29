"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import useWeb3 from "@/hooks/useWeb3";
import useCampaign from "@/hooks/useCampaign";
import { useCampaignStore } from "@/hooks/useCampaignStore";
import { getErrorMessage } from "@/utils/utils";
import ProcessingRequestInfo from "../commons/ProcessingRequestInfo";
import FormSubmitBtn from "./FormSubmitBtn";
import { FormFieldContainer, FieldLabel, FormFieldError } from "./FormFields";
import { type CampaignDetails } from "@/hooks/useCampaignDetails";

type Inputs = {
  contributionAmount: number;
};

interface ContributeFormProps {
  campaignAddress: string;
  refresh: () => void;
}

export default function ContributeForm({
  campaignAddress,
  refresh,
}: ContributeFormProps) {
  const web3 = useWeb3();
  const campaign = useCampaign(campaignAddress);
  const campaignDetails: CampaignDetails = useCampaignStore(
    (state) => state.campaignDetails
  );

  const minimumContribution = String(
    web3?.utils.fromWei(campaignDetails.minimumContribution, "ether")
  );
  const [processingReq, setProcessingReq] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSumbit: SubmitHandler<Inputs> = async (data) => {
    const accounts = await web3?.eth.getAccounts();

    if (accounts && campaign) {
      setProcessingReq(true);
      try {
        await campaign?.methods.contribute().send({
          from: accounts[0],
          value: web3?.utils.toWei(data.contributionAmount, "ether"),
        });
        toast.success("Successfully contributed to the campaign!");
        refresh();
      } catch (error: unknown) {
        const errMessage: string = getErrorMessage(error);
        console.log("Failed to contribute to the campaign:", errMessage);
        toast.error(`Failed to contribute to the campaign\n${errMessage}`);
      } finally {
        setProcessingReq(false);
      }
    } else {
      toast.error("Failed to load web3 accounts, operation is not possible.");
    }

    setProcessingReq(false);
  };

  return (
    <form
      className="mx-auto rounded-2xl p-6 bg-gray-800 max-w-lg flex flex-col space-y-6 border border-gray-200"
      onSubmit={handleSubmit(onSumbit)}
    >
      <FormFieldContainer>
        <FieldLabel>Amount to contribute:</FieldLabel>
        <div className="relative grow">
          <input
            type="text"
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue={minimumContribution}
            {...register("contributionAmount", {
              required: true,
              min: {
                value: minimumContribution,
                message: `Minimum value is ${minimumContribution}.`,
              },
            })}
          />
          <p className="absolute top-1 right-10">ether</p>
        </div>
        {errors.contributionAmount && (
          <FormFieldError>{errors.contributionAmount.message}</FormFieldError>
        )}
      </FormFieldContainer>

      {processingReq ? <ProcessingRequestInfo /> : <FormSubmitBtn />}
    </form>
  );
}
