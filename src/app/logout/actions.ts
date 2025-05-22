"use server";

import { redirect } from "next/navigation";

export async function logout() {
  try {
    // Call the API logout endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    // Redirect to login page
    redirect("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Still redirect even if the API call fails
    redirect("/login");
  }
}
