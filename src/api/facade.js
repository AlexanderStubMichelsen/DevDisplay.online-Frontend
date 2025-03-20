const API_URL = "http://localhost:5019/api/users";

const apiFacade = {
  // ✅ Handle Sign Up
  signUp: async (signupData) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Sign-Up Error:", error);
      throw error;
    }
  },

  // ✅ Handle Login
  login: async (loginData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  // ✅ Handle Logout
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginData");
    window.dispatchEvent(new Event("storage")); // ✅ Force re-render
  },

  // ✅ Get Logged-In User
  getUser: () => {
    return JSON.parse(localStorage.getItem("loginData")) || { email: "" };
  },
};

export default apiFacade;
