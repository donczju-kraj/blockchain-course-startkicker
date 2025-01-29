"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import useCampaign from "@/hooks/useCampaign";
import { getErrorMessage } from "@/utils/utils";
import ProcessingRequestInfo from "../commons/ProcessingRequestInfo";
import FormSubmitBtn from "./FormSubmitBtn";
import { FormFieldContainer, FieldLabel, FormFieldError } from "./FormFields";

type Inputs = {
  contributionAmount: number;
};

export default function ContributeForm({
  campaignAddress,
}: {
  campaignAddress: string;
}) {
  const campaign = useCampaign(campaignAddress);
  const [processingReq, setProcessingReq] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSumbit: SubmitHandler<Inputs> = async (data) => {
    setProcessingReq(true);
    console.log(data);
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
            type="number"
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue={100}
            {...register("contributionAmount", {
              required: true,
              min: { value: 0, message: "Minimum value is 0." },
            })}
          />
          <p className="absolute top-1 right-10">wei</p>
        </div>
        {errors.contributionAmount && (
          <FormFieldError>{errors.contributionAmount.message}</FormFieldError>
        )}
      </FormFieldContainer>

      {processingReq ? <ProcessingRequestInfo /> : <FormSubmitBtn />}
    </form>
  );
}
