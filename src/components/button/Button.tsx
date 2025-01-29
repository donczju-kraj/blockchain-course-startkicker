"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  version?: "blue" | "green" | "red";
}

const BASIC_CLS =
  "rounded-md ml-2 py-1 px-3 border border-transparent transition-all focus:shadow-none text-center text-sm shadow-md hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:shadow-none font-semibold";

const BTN_VERSIONS = {
  blue: "bg-blue-600 text-white focus:bg-blue-800 active:bg-blue-700 hover:bg-blue-700",
  green:
    "bg-green-600 text-white focus:bg-green-800 active:bg-green-700 hover:bg-green-700",
  red: "bg-red-600 text-white focus:bg-red-800 active:bg-red-700 hover:bg-red-700",
};

export default function Button({
  children,
  onClick,
  className,
  version = "blue",
  ...rest
}: ButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={clsx(
        BASIC_CLS,
        BTN_VERSIONS[version],
        // "bg-blue-600 text-white focus:bg-blue-800 active:bg-blue-700 hover:bg-blue-700",
        className
      )}
      onClick={handleClick}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
