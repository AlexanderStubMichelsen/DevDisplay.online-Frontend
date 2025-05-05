import { getConfig } from '../../config.js';

const API_URL_ENDPOINT = "/users";

const apiFacade = {
  signUp: async (signupData) => {
    const config = await getConfig(); // Must be inside an async function
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;
  
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
  
      if (!response.ok) {
        // Check if it's a conflict error (409)
        if (response.status === 409) {
          const responseData = await response.json();  // Now this will be a valid JSON response
          throw new Error(responseData.message || "A user with this email already exists.");
        }
      }
  
      // Proceed with login if sign-up is successful
      const loginResponse = await apiFacade.login({
        email: signupData.email,
        password: signupData.password,
      });
  
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      sessionStorage.setItem("loginData", JSON.stringify({
        id: loginResponse.userDto.id,
        email: loginResponse.userDto.email,
        name: loginResponse.userDto.name,
        token: loginResponse.token,
      }));
  
      window.dispatchEvent(new Event("storage"));
      return loginResponse;
    } catch (error) {
      console.error("Sign-Up Error:", error);
  
      // Display a user-friendly message
      alert(error.message);  // This could be a more styled alert or modal in your UI
      throw error;
    }
  },  

  login: async (loginData) => {
    const config = await getConfig(); // Must be inside an async function
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Invalid email or password");
      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  logout: () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginData");
    window.dispatchEvent(new Event("storage"));
  },

  getUser: () => {
    const user = JSON.parse(sessionStorage.getItem("loginData"));
    return {
      id: user?.id || "",
      email: user?.email || "",
      name: user?.name || "",
    };
  },

  updateUser: async (user) => {
    const config = await getConfig(); // Must be inside an async function
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

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

      if (!response.ok) throw new Error("Update failed");
      return await response.json();
    } catch (error) {
      console.error("Update User Error:", error);
      throw error;
    }
  },

  changePassword: async ({ oldPassword, newPassword }) => {
    const config = await getConfig(); // Must be inside an async function
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

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

      if (!response.ok) throw new Error("Password change failed");
      return await response.json();
    } catch (error) {
      console.error("Change Password Error:", error);
      throw error;
    }
  },

  getProtectedData: async () => {
    const config = await getConfig(); // Must be inside an async function
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;
    
    try {
      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
      const response = await fetch(`${API_URL}/protected-endpoint`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch protected data");
      return await response.json();
    } catch (error) {
      console.error("Protected Data Error:", error);
      throw error;
    }
  },
};

export default apiFacade;
