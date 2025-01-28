"use client";

import Link from "next/link";

import useFactory from "@/hooks/useFactory";
import AddCircle from "../icons/AddCircle";

export default function AddCampaign() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-800">
      <p className="text-lg font-semibold">
        Do you want to create a new campaign?
      </p>
      <Link
        href="/new-campaign"
        className="transition delay-150 duration-300 ease-in-out hover:scale-110 px-4 py-3 bg-blue-700 hover:bg-blue-800 rounded-xl flex space-x-4 items-center w-fit"
      >
        <AddCircle size={24} fill="fill-gray-200" />
        <p className="font-semibold">Add campaign</p>
      </Link>
    </div>
  );
}
