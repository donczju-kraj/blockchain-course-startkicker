import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

interface MyLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export default function MyLink({ children, href, className }: MyLinkProps) {
  return (
    <Link
      className={clsx(
        "transition ease-in-out duration-300 delay-150 hover:scale-110 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 font-semibold text-sm",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
