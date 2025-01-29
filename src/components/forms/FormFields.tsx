import { ReactNode } from "react";
import clsx from "clsx";

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="font-semibold">{children}</label>;
}

export function FormFieldContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}

export function FormFieldError({ children }: { children: ReactNode }) {
  return <p className="text-sm italic">{children}</p>;
}
export function FormSubmitBtn({ className }: { className?: string }) {
  return (
    <input
      className={clsx(
        "transition ease-in-out delay-150 duration-300 hover:scale-110 mx-auto w-32 px-2 py-1 rounded-lg bg-blue-700 font-semibold hover:bg-blue-800",
        className
      )}
      type="submit"
    />
  );
}
