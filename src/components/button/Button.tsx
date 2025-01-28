"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const BASIC_CLS =
  "rounded-md ml-2 py-2 px-4 border border-transparent transition-all focus:shadow-none text-center text-sm shadow-md hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:shadow-none";

export default function Button({ children, onClick, className }: ButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button
      className={clsx(
        BASIC_CLS,
        "bg-blue-600 text-white focus:bg-blue-800 active:bg-blue-700 hover:bg-blue-700",
        className
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
