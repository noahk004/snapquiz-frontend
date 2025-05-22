type RegisterResult = {
  success: boolean;
  error?: string;
};

export async function register(formData: FormData): Promise<RegisterResult> {
  // Get form data
  const first = formData.get("first") as string;
  const last = formData.get("last") as string;
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

    console.log(first, last, email, username, password, confirmPassword)

  // Basic validation
  if (
    !first ||
    !last ||
    !email ||
    !username ||
    !password ||
    !confirmPassword
  ) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match",
    };
  }

  try {
    // Call registration API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first,
          last,
          email,
          username,
          password,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Registration failed",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Failed to connect to registration service",
    };
  }
}
