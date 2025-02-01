export async function checkSession() {
  try {
    const response = await fetch("/api/check_session", {
      method: "GET",
      credentials: "include",  
    });

    if (!response.ok) return null;

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
}
