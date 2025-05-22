"use client"

import Cookies from "js-cookie"

export async function deleteTest(testId: number) {
  // ✅ Get the token or session cookie from client-side
  const token = Cookies.get("token") // replace with your cookie name

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests/${testId}`, {
    method: "DELETE",
    credentials: "include", // include cookies like session if needed
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // optional
    },
  });

  return response;
}
