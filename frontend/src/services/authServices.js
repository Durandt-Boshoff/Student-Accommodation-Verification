
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

// Get the currently authenticated user
export const getCurrentUser = async () => {
  let response;

  try {
    response = await fetch(`${API_URL}/me`, {
      method: "GET",
      credentials: "include",
    });
  } catch {
    throw new Error("Unable to connect to the authentication server.");
  }

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to verify your session.");
  }

  const data = await response.json().catch(() => ({}));

  return data.user || null;
};

// Log out the currently authenticated user
export const logoutUser = async () => {
  let response;

  try {
    response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    throw new Error("Unable to connect to the authentication server.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Logout failed.");
  }

  return data;
};
