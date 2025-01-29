import { ReactNode } from "react";

export default function RowCell({ children }: { children: ReactNode }) {
  return (
    <td className="h-8 px-2 bg-gray-700 border border-gray-400 text-center">
      {children}
    </td>
  );
}
