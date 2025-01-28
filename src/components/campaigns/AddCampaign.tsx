"use client";

import useFactory from "@/hooks/useFactory";
import Button from "../button/Button";

export default function AddCampaign() {
  const factory = useFactory();
  return (
    <div className="flex flex-col space-y-3 justify-center">
      <p className="text-lg font-semibold">
        Do you want to create a new campaign?
      </p>
      <Button
        onClick={() => {
          console.log("add campaing");
        }}
        className="font-semibold"
      >
        Add campaign
      </Button>
    </div>
  );
}
