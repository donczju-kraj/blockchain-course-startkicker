"use client";

import useFactory from "@/hooks/useFactory";
import Button from "../button/Button";

export default function AddCampaign() {
  const factory = useFactory();
  return (
    <div className="flex items-center justify-between mt-4">
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
