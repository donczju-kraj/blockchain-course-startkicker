import { ReactNode } from "react";

export default function HeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="h-10 px-2 bg-gray-800 font-semibold border border-gray-400">
      {children}
    </th>
  );
}
