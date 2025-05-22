type LoginResult = {
  success: boolean;
  error?: string;
};

export async function login(formData: FormData): Promise<LoginResult> {
  // Get form data
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!username || !password) {
    return {
      success: false,
      error: "Username and password are required",
    };
  }

  try {
    // Call authentication API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
        // cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Invalid username or password",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Failed to connect to authentication service",
    };
  }
}
