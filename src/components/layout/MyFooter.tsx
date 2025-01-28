export default function MyFooter() {
  return (
    <footer className="sticky bottom-0 z-50 bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-100">
        <p>
          &copy; {new Date().getFullYear()} Start kicker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
