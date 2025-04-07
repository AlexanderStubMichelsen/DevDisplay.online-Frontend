// const API_URL = "http://172.105.95.18:5019/api/users";
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

      const loginResponse = await apiFacade.login({
        email: signupData.email,
        password: signupData.password,
      });

      // ✅ Save full user info including ID
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      sessionStorage.setItem(
        "loginData",
        JSON.stringify({
          id: loginResponse.userDto.id,
          email: loginResponse.userDto.email,
          name: loginResponse.userDto.name,
          token: loginResponse.token,
        })
      );

      window.dispatchEvent(new Event("storage"));
      return loginResponse;
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  // ✅ Handle Logout
  logout: () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginData");
    window.dispatchEvent(new Event("storage"));
  },

  // ✅ Get Logged-In User
  getUser: () => {
    const user = JSON.parse(sessionStorage.getItem("loginData"));
    return {
      id: user?.id || "",
      email: user?.email || "",
      name: user?.name || "",
    };
  },

  // ✅ Update User (name/password)
  updateUser: async (user) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;

      const response = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Update User Error:", error);
      throw error;
    }
  },

  // ✅ Change Password
  changePassword: async ({ oldPassword, newPassword }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;

      const response = await fetch(`${API_URL}/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Password change failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Change Password Error:", error);
      throw error;
    }
  },

  // ✅ Example of a Protected API Request
  getProtectedData: async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;

      const response = await fetch(`${API_URL}/protected-endpoint`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }

      return await response.json();
    } catch (error) {
      console.error("Protected Data Error:", error);
      throw error;
    }
  },
  
};

export default apiFacade;
