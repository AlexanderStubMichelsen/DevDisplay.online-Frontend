import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import abstractbackground from "../../assets/153450-805374052_small.mp4"; // Import the video file
import "../../css/pages/Board.css";
import facade from "../../util/api/BoardPostFacade.js";
import ScrollIndicator from "../modules/ScrollIndicator"; // Import ScrollIndicator component

const Board = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load messages from API on component mount
  useEffect(() => {
    fetchMessages(); // Add parentheses!
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await facade.getAllBoardPosts(); // This returns parsed data
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages from server. Using local storage as fallback.");

      // Fallback to localStorage if API fails
      const savedMessages = localStorage.getItem("boardMessages");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMessage.name.trim() || !newMessage.message.trim()) {
      alert("Please fill in both name and message fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const messageObj = {
      name: newMessage.name.trim(),
      message: newMessage.message.trim(),
    };

    try {
      const savedMessage = await facade.createBoardPost(messageObj); // This returns parsed data

      // Add new message to the beginning of the array
      setMessages((prev) => [savedMessage, ...prev]);

      // Clear form
      setNewMessage({ name: "", message: "" });
    } catch (error) {
      console.error("Error posting message:", error);
      setError("Failed to post message to server. Saving locally.");

      // Fallback to localStorage if API fails
      const fallbackMessage = {
        ...messageObj,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isLocal: true,
      };

      setMessages((prev) => [fallbackMessage, ...prev]);

      // Save to localStorage as backup
      const updatedMessages = [fallbackMessage, ...messages];
      localStorage.setItem("boardMessages", JSON.stringify(updatedMessages));

      // Clear form even if API fails
      setNewMessage({ name: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (id, isLocal = false) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      if (!isLocal) {
        await facade.deleteBoardPost(id);
      }

      // Remove from local state
      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      // Update localStorage
      const updatedMessages = messages.filter((msg) => msg.id !== id);
      localStorage.setItem("boardMessages", JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message from server.");
    }
  };

  const clearAllMessages = async () => {
    if (!window.confirm("Are you sure you want to clear all messages?")) {
      return;
    }

    try {
      await facade.deleteAllBoardPosts();
      setMessages([]);
      localStorage.removeItem("boardMessages");
    } catch (error) {
      console.error("Error clearing messages:", error);
      setError("Failed to clear messages from server.");
    }
  };

  const refreshMessages = () => {
    fetchMessages();
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="board-container">
          <div className="board-content">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="loading">Loading messages...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <div className="board-wrapper">
      <NavBar />
      <div className="board-container">
        <div className="board-content">
          <video autoPlay loop muted playsInline className="video-bg">
            <source src={abstractbackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="board-title">Message Board</h1>
          <p className="board-subtitle">Leave a message for other visitors!</p>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={refreshMessages} className="retry-btn">
                Retry Connection
              </button>
            </div>
          )}

          {/* Message Form */}
          <form onSubmit={handleSubmit} className="message-form">
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newMessage.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                maxLength="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                name="message"
                value={newMessage.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                rows="4"
                maxLength="500"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Message"}
            </button>
          </form>

          {/* Messages Display */}
          <div className="messages-section">
            <div className="messages-header">
              <h2>Messages ({messages.length})</h2>
              <div className="header-buttons">
                <button onClick={refreshMessages} className="refresh-btn">
                  Refresh
                </button>
                {messages.length > 0 && (
                  <button onClick={clearAllMessages} className="clear-btn">
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="no-messages">
                <p>No messages yet. Be the first to leave a message!</p>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-card ${
                      msg.isLocal ? "local-message" : ""
                    }`}
                  >
                    <div className="message-header">
                      <strong className="message-author">{msg.name}</strong>
                      <div className="message-meta">
                        {msg.isLocal && (
                          <span className="local-badge">Local</span>
                        )}
                        <span className="message-timestamp">
                          {new Date(
                            msg.timestamp || msg.createdAt
                          ).toLocaleString()}
                        </span>
                        <button
                          onClick={() =>
                            handleDeleteMessage(msg.id, msg.isLocal)
                          }
                          className="delete-btn"
                          title="Delete message"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="message-content">{msg.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      </div>
      <ScrollIndicator />
    </>
  );
};

export default Board;
