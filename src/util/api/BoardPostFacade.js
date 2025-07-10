import { getConfig } from "../../config.js";

const API_URL_ENDPOINT = "boardposts";

class BoardPostFacade {
  
  // Get all board posts
  async getAllBoardPosts() {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching board posts:", error);
      throw error;
    }
  }

  // Get a specific board post by ID
  async getBoardPost(id) {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Board post not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching board post:", error);
      throw error;
    }
  }

  // Create a new board post
  async createBoardPost(boardPost) {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: boardPost.name,
          message: boardPost.message,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(`Validation error: ${JSON.stringify(errorData)}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating board post:", error);
      throw error;
    }
  }

  // Update an existing board post
  async updateBoardPost(id, boardPost) {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          id: id,
          name: boardPost.name,
          message: boardPost.message,
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(`Validation error: ${JSON.stringify(errorData)}`);
        }
        if (response.status === 404) {
          throw new Error("Board post not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error updating board post:", error);
      throw error;
    }
  }

  // Delete a specific board post
  async deleteBoardPost(id) {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Board post not found");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting board post:", error);
      throw error;
    }
  }

  // Delete all board posts
  async deleteAllBoardPosts() {
    try {
      const config = await getConfig();
      const API_URL = `${config.API_URL}/${API_URL_ENDPOINT}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error deleting all board posts:", error);
      throw error;
    }
  }

  // Helper method to check if board post exists
  async boardPostExists(id) {
    try {
      return true;
    } catch (error) {
      if (error.message.includes("not found")) {
        return false;
      }
      throw error;
    }
  }
}

// Export a singleton instance
const boardPostFacade = new BoardPostFacade();
export default boardPostFacade;
