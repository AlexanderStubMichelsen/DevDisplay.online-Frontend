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
  
      const data = await response.json();
      console.log("response:", data);
  
      return data;
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
    const user = JSON.parse(localStorage.getItem('loginData'));
    console.log('user:', user);
    return {
      email: user?.email || '',
      name: user?.name || '',     // ✅ Make sure this is included!
      
      // optionally: other fields like `role`, `id`, etc.
    };
  },

  // ✅ Update User
  updateUser: async (user) => {
    try {
      const response = await fetch(`${API_URL}/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (!response.ok) {
        throw new Error("Update failed");
      }
  
      // Check if the response body is empty
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      return data;
    } catch (error) {
      console.error("Update User Error:", error);
      throw error;
    }
  }
};

export default apiFacade;
