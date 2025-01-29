import { ReactNode } from "react";

export default function RowCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-2 border border-gray-400 text-center">{children}</td>
  );
}
