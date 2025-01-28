import Link from "next/link";

export default function MyHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Start kicker
        </h1>
        <nav className="text-gray-100 hover:text-gray-300 font-semibold">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/new-campaign" className="hover:underline">
                Add campaign
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
