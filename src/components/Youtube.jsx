import React, { useState } from "react";
import NavBar from "./NavBar";

function Youtube() {
  const [videoUrl, setVideoUrl] = useState(""); // Store user input
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY; // ✅ Secure API Key

  // Function to Extract Video ID from YouTube URL
  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*v=|.*\/|.*vi=)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([0-9A-Za-z_-]{11})/
    );
    return match ? match[1] : null;
  };

  const fetchYoutubeData = async (id) => {
    if (!id) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("API Response:", result); // ✅ Debugging API response

      if (result.link) {
        setDownloadLink(result.link);
      } else {
        setError(result.msg || "Failed to retrieve download link. Try another video.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again later.");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoIdExtracted = extractVideoId(videoUrl); // Extract ID from URL
    if (videoIdExtracted) {
      fetchYoutubeData(videoIdExtracted);
    } else {
      setError("Invalid YouTube URL. Please enter a correct one.");
    }
  };

  return (
    <>
    <NavBar />
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>YouTube MP3 Downloader</h2>

      {/* Input Form for YouTube URL */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter YouTube URL:
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            style={{ width: "80%", padding: "8px", margin: "10px" }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Fetching..." : "Get MP3"}
        </button>
      </form>

      {/* Display Errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Download Link */}
      {downloadLink && (
        <div style={{ marginTop: "20px" }}>
          <p>Click below to download:</p>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button style={{ padding: "10px", background: "green", color: "white" }}>
              Download MP3
            </button>
          </a>
        </div>
      )}
    </div>
    </>
  );
}

export default Youtube;
