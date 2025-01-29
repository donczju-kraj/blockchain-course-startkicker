import React, { ReactNode } from "react";
import clsx from "clsx";

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function FieldInput({ className, ...rest }: FieldInputProps) {
  return (
    <input
      type="text"
      className={clsx(
        "border border-gray-200 px-4 py-1 rounded-lg w-full bg-gray-700",
        className
      )}
      {...rest}
    />
  );
}

interface FieldInputWithUnitProps extends FieldInputProps {
  unit: string;
}

export function FieldInputWithUnit({
  unit,
  className,
  ...rest
}: FieldInputWithUnitProps) {
  return (
    <div className={clsx("flex grow", className)}>
      <input
        type="text"
        className="border border-gray-200 px-4 py-1 rounded-l-lg w-full bg-gray-700"
        {...rest}
      />
      <p className="font-semibold bg-gray-200 text-gray-800 rounded-r-lg px-2 flex items-center">
        {unit}
      </p>
    </div>
  );
}

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
