"use client";

import { useParams } from "next/navigation";

export default function RequestsList() {
  const params = useParams();
  const address = params?.address;
  return (
    <section>
      <p>Here I will have requests list for:</p>
      <p>{address}</p>
    </section>
  );
}
