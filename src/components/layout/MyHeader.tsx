import Link from "next/link";

const LINK_TRANSITION_CLS =
  "transition ease-in-out delay-150 duration-300 hover:scale-110 hover:underline";

export default function MyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link className={LINK_TRANSITION_CLS} href="/">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Start kicker
          </h1>
        </Link>
        <nav className="text-gray-100 hover:text-gray-300 font-semibold">
          <ul className="flex space-x-4">
            <li className={LINK_TRANSITION_CLS}>
              <Link href="/">Campaigns</Link>
            </li>
            <li className={LINK_TRANSITION_CLS}>
              <Link href="/new-campaign">Add campaign</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
