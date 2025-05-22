import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginPage from "./LoginPage";

export default async function Page() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (token) {
      redirect("/dashboard");
  }

  return <LoginPage />
}