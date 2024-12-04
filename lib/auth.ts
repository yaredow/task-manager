import { cookies } from "next/headers";
import { backendUrl } from "./constants";

export const validateAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_auth")?.value;

  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const response = await fetch(`${backendUrl}/api/v1/auth/jwt/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    });

    if (response.status === 200) {
      return { isAuthenticated: true };
    }
  } catch (error) {
    console.error(error);
    return {
      isAuthenticated: false,
    };
  }
};
