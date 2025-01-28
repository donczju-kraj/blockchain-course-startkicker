import { ReactNode } from "react";
import clsx from "clsx";

function DetailContainer({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-3 border border-gray-200 bg-gray-800 rounded-xl">
      {children}
    </div>
  );
}
export default function CampaignDetails({ className }: { className?: string }) {
  return (
    <div className={clsx("grid grid-cols-2 gap-6", className)}>
      <DetailContainer>
        <p>Campaign balance</p>
      </DetailContainer>
      <DetailContainer>
        <p>Minimum contribution</p>
      </DetailContainer>
      <DetailContainer>
        <p>Pending requests</p>
      </DetailContainer>
      <DetailContainer>
        <p>Contributors</p>
      </DetailContainer>
    </div>
  );
}
