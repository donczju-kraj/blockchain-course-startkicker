"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";

import useFactory from "@/hooks/useFactory";
import useWeb3 from "@/hooks/useWeb3";
import ProcessingRequestInfo from "../commons/ProcessingRequestInfo";
import { getErrorMessage } from "@/utils/utils";
import {
  FieldLabel,
  FormFieldContainer,
  FormFieldError,
  FormSubmitBtn,
  FieldInputWithUnit,
} from "./FormFields";

type Inputs = {
  minContribution: number;
};

export default function AddCampaignForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [processingReq, setProcessingReq] = useState<boolean>(false);
  const router = useRouter();
  const factory = useFactory();
  const web3 = useWeb3();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const accounts = await web3?.eth.getAccounts();

    if (accounts && factory) {
      setProcessingReq(true);
      try {
        await factory?.methods.createCampaign(data.minContribution).send({
          from: accounts[0],
        });
        toast.success("Campaign succesfully created!");
        router.push("/");
      } catch (error: unknown) {
        const errMessage: string = getErrorMessage(error);
        console.log("Failed to create campaign:", errMessage);
        toast.error(`Failed to create campaign\n${errMessage}`);
      } finally {
        setProcessingReq(false);
      }
    } else {
      toast.error("Failed to load web3 accounts, operation is not possible.");
    }
  };

  return (
    <form
      className={clsx(
        "mx-auto rounded-2xl p-6 bg-gray-800 max-w-lg flex flex-col space-y-6 border border-gray-200",
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <FormFieldContainer>
        <FieldLabel>Minimum contribution:</FieldLabel>
        <FieldInputWithUnit
          unit="wei"
          defaultValue={100}
          {...register("minContribution", {
            required: true,
            min: { value: 0, message: "Minimum value is 0." },
          })}
        />
        {errors.minContribution && (
          <FormFieldError>{errors.minContribution.message}</FormFieldError>
        )}
      </FormFieldContainer>

      {processingReq ? <ProcessingRequestInfo /> : <FormSubmitBtn />}
    </form>
  );
}
