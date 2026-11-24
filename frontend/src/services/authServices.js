const API_URL = "http://localhost:3000/api/auth";

// Get the currently authenticated user
export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }

    throw new Error("Unable to verify your session.");
  }

  const data = await response.json();

  return data.user;
};

// Log out the currently authenticated user
export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed.");
  }

  return data;
};
