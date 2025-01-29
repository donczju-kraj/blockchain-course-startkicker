"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";

import useFactory from "@/hooks/useFactory";
import useWeb3 from "@/hooks/useWeb3";
import FormSubmitBtn from "./FormSubmitBtn";
import ProcessingRequestInfo from "../commons/ProcessingRequestInfo";
import { getErrorMessage } from "@/utils/utils";
import { FieldLabel, FormFieldContainer, FormFieldError } from "./FormFields";

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
    setProcessingReq(true);
    const accounts = await web3?.eth.getAccounts();

    if (accounts && factory) {
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
        <div className="relative grow">
          <input
            type="number"
            className="border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700"
            defaultValue={100}
            {...register("minContribution", {
              required: true,
              min: { value: 0, message: "Minimum value is 0." },
            })}
          />
          <p className="absolute top-1 right-10">wei</p>
        </div>
        {errors.minContribution && (
          <FormFieldError>{errors.minContribution.message}</FormFieldError>
        )}
      </FormFieldContainer>

      {processingReq ? <ProcessingRequestInfo /> : <FormSubmitBtn />}
    </form>
  );
}
