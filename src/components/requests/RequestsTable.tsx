"use client";

import useCamapignRequests, { type Request } from "@/hooks/useCampaignRequests";
import { ReactNode } from "react";

function RowCell({ children }: { children: ReactNode }) {
  return (
    <td className="h-8 px-2 bg-gray-700 border border-gray-400">{children}</td>
  );
}

function TableRow({ index, request }: { index: number; request: Request }) {
  return (
    <tr>
      <RowCell>{index + 1}</RowCell>
      <RowCell>{request.description}</RowCell>
      <RowCell>{request.value}</RowCell>
      <RowCell>{request.recipient}</RowCell>
      <RowCell>{request.approvalCount}</RowCell>
      <RowCell>Approve</RowCell>
      <RowCell>Finalize</RowCell>
    </tr>
  );
}

function HeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="h-10 px-2 bg-gray-800 font-semibold border border-gray-400">
      {children}
    </th>
  );
}

export default function RequestsTable({ address }: { address: string }) {
  const { requests } = useCamapignRequests(address);

  if (!requests) return <></>;

  return (
    <table className="table-auto border-collapse border border-gray-400">
      <thead>
        <tr>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Recipient</HeaderCell>
          <HeaderCell>Approval count</HeaderCell>
          <HeaderCell>Approve</HeaderCell>
          <HeaderCell>Finalize</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {requests.map((req: Request, i: number) => {
          return <TableRow key={i} index={i} request={req} />;
        })}
      </tbody>
    </table>
  );
}
