"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import useCampaign from "@/hooks/useCampaign";
import useWeb3 from "@/hooks/useWeb3";
import ProcessingRequestInfo from "../commons/ProcessingRequestInfo";
import {
  FormFieldContainer,
  FieldLabel,
  FormFieldError,
  FormSubmitBtn,
} from "./FormFields";
import { getErrorMessage } from "@/utils/utils";

type Inputs = {
  value: number;
  description: string;
  recipient: string;
};

export default function AddRequestForm({ address }: { address: string }) {
  const [processingReq, setProcessingReq] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const campaign = useCampaign(address);
  const web3 = useWeb3();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setProcessingReq(true);

    if (campaign && web3) {
      const accounts = await web3.eth.getAccounts();
      const { description, value, recipient } = data;

      try {
        await campaign.methods
          .createRequest(
            description,
            web3.utils.toWei(value, "ether"),
            recipient
          )
          .send({
            from: accounts[0],
          });
        toast.success("Successfully created new request!");
        reset();
      } catch (error) {
        const errMessage: string = getErrorMessage(error);
        console.log("Failed to contribute to the campaign:", errMessage);
        toast.error(`Failed to contribute to the campaign\n${errMessage}`);
      } finally {
        setProcessingReq(false);
      }
    } else {
      toast.error("Unable to get campaign contract or connect to web3.");
    }
    setProcessingReq(false);
  };

  return (
    <form
      className="mx-auto rounded-2xl p-6 bg-gray-800 max-w-xl w-[540px] flex flex-col space-y-6 border border-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFieldContainer>
        <FieldLabel>Description:</FieldLabel>
        <div className="relative grow">
          <textarea
            rows={4}
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue=""
            {...register("description", {
              required: true,
            })}
          />
        </div>
        {errors.description && (
          <FormFieldError>{errors.description.message}</FormFieldError>
        )}
      </FormFieldContainer>

      <FormFieldContainer>
        <FieldLabel>Recipient:</FieldLabel>
        <div className="relative grow">
          <input
            type="text"
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue=""
            {...register("recipient", {
              required: true,
            })}
          />
        </div>
        {errors.recipient && (
          <FormFieldError>{errors.recipient.message}</FormFieldError>
        )}
      </FormFieldContainer>

      <FormFieldContainer>
        <FieldLabel>Value</FieldLabel>
        <div className="relative grow">
          <input
            type="text"
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue=""
            {...register("value", {
              required: true,
            })}
          />
          <p className="absolute top-1 right-10">ether</p>
        </div>
        {errors.value && (
          <FormFieldError>{errors.value.message}</FormFieldError>
        )}
      </FormFieldContainer>

      {processingReq ? <ProcessingRequestInfo /> : <FormSubmitBtn />}
    </form>
  );
}
