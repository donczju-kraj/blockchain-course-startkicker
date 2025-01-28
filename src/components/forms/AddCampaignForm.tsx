"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";

import useFactory from "@/hooks/useFactory";
import useWeb3 from "@/hooks/useWeb3";
import Spinner from "../icons/Spinner";
import { getErrorMessage } from "@/utils/utils";

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
  const factory = useFactory();
  const web3 = useWeb3();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setProcessingReq(true);
    const accounts = await web3?.eth.getAccounts();
    if (accounts && factory) {
      try {
        await factory?.methods.createCampaign(data.minContribution).send({
          from: accounts[0],
        });
        toast.success("Campaign succesfully created!");
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
        "mx-auto rounded-2xl p-6 bg-gray-800 max-w-lg flex flex-col space-y-4",
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Minimum contribution:</label>
        <div className="relative grow">
          <input
            type="number"
            className="border border-gray-200 px-2 py-1 rounded-lg w-full"
            defaultValue={100}
            {...register("minContribution", {
              required: true,
              min: { value: 0, message: "Minimum value is 0." },
            })}
          />
          <p className="absolute top-1 right-8">wei</p>
        </div>
        {errors.minContribution && (
          <p>message:{errors.minContribution.message}</p>
        )}
      </div>

      {processingReq ? (
        <div className="flex mx-auto px-3 py-2 bg-blue-800 rounded-lg">
          <Spinner />
          <p className="flex text-sm font-semibold">
            Request is being processed
          </p>
        </div>
      ) : (
        <input
          className="transition ease-in-out delay-150 duration-300 hover:scale-110 mx-auto w-32 px-2 py-1 rounded-lg bg-blue-700 font-semibold hover:bg-blue-800"
          type="submit"
        />
      )}
    </form>
  );
}
