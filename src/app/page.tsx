"use client";

import useFactoryInstance from "@/hooks/useFactoryInstance";

export default function Home() {
  const factoryInstance = useFactoryInstance();

  if (factoryInstance) {
    console.log(factoryInstance);
  }
  return (
    <div className="border border-slate-200 bg-gray-900 px-4 py-2 flex flex-col items-center justify-center space-y-4">
      <h1 className="text-xl font-semibold">Start kicker</h1>
    </div>
  );
}
