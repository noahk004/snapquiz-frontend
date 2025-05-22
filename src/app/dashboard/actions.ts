import { cookies } from "next/headers";
import { MetaTest } from "../types";

export async function fetchTests(): Promise<MetaTest[] | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error while fetching tests: ", data.error);
    return null;
  }

  return data;
}
