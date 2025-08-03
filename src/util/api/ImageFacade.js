import { getConfig } from '../../config.js';

const API_URL_ENDPOINT = "images";

const ImageFacade = {
  saveImage: async (image) => {
    try {
      const config = await getConfig(); // Must be inside an async function
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
      if (!token) throw new Error("Not authenticated");

      const payload = {
        imageUrl: image.url,
        title: image.alt || "Untitled",
        photographer: image.photographer,
        sourceLink: image.profileLink,
        // Ensure userId is included if required by the backend
        userId: JSON.parse(sessionStorage.getItem("loginData"))?.id,
      };

      console.log("Saving image with payload:", payload);

      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save image");
      }

      return await response.json();
    } catch (error) {
      console.error("Save Image Error:", error);
      throw error;
    }
  },

  getSavedImages: async () => {
    const config = await getConfig();
    const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

    const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
    if (!token) throw new Error("Not authenticated. Token expired. Login again.");

    const response = await fetch(`${API_URL}/mine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle token expiration
        sessionStorage.clear(); // Clear session storage
        throw new Error("Session expired. Please log in again.");
      }

      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch saved images");
    }

    return await response.json();
  },

  getUserCountForImage: async (imageUrl) => {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
      if (!token) throw new Error("Not authenticated");

      // Use POST with body - much more reliable for complex URLs
      const response = await fetch(`${API_URL}/image-user-count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl: imageUrl }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Failed to fetch user count for image ${imageUrl}:`, errorText);
        return 0;
      }

      const count = await response.json();
      return count || 0;
    } catch (error) {
      console.error("Get User Count Error:", error);
      return 0;
    }
  },

  deleteSavedImage: async (imageId) => {
    try {
      const config = await getConfig(); // Must be inside an async function
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/${imageId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete image");
      }

      return await response.json();
    } catch (error) {
      console.error("Delete Image Error:", error);
      throw error;
    }
  },

  getUsersWithImagesCount: async () => {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const token = JSON.parse(sessionStorage.getItem("loginData"))?.token;
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${API_URL}/users-with-images-count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch users count");
      }

      return await response.json();
    } catch (error) {
      console.error("Get Users Count Error:", error);
      return 0;
    }
  },
};

export default ImageFacade;
