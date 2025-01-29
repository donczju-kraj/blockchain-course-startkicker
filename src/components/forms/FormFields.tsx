import { ReactNode } from "react";

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="font-semibold">{children}</label>;
}

export function FormFieldContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}

export function FormFieldError({ children }: { children: ReactNode }) {
  return <p className="text-sm italic">{children}</p>;
}
