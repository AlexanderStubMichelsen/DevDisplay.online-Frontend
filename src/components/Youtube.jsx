import React, { useState } from "react";
import "../css/Youtube.css";
import NavBar from "./NavBar";

function Youtube() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  // 🔍 Fetch Videos from YouTube
  const searchVideos = async (pageToken = "") => {
    if (!searchQuery) {
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&key=${youtubeApiKey}&maxResults=12&pageToken=${pageToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Search Results:", data);

      if (data.items) {
        setSearchResults((prevResults) => [...prevResults, ...data.items]); // ✅ Append new results
        setNextPageToken(data.nextPageToken || null);
      } else {
        setError("No videos found. Try another search.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching search results. Try again.");
    }

    setLoading(false);
  };

  // 🎵 Convert to MP3
  const fetchYoutubeMp3 = async (id) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setDownloadLink(null);

    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("MP3 Response:", result);

      if (result.link) {
        setDownloadLink(result.link);
      } else {
        setError(result.msg || "Failed to retrieve MP3 link.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching MP3 link. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <NavBar />
    <div>
      <h2>YouTube MP3 Downloader</h2>

      {/* 🔍 Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search YouTube videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => searchVideos()} disabled={loading} className="search">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* 🎥 Display Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3>Select a Video:</h3>
          <div className="video-results">
            {searchResults.map((video) =>
              video.id.videoId ? ( // ✅ Ensure videoId exists to prevent errors
                <div key={video.id.videoId} className="video-item">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    onClick={() => fetchYoutubeMp3(video.id.videoId)}
                    className="video-thumbnail"
                  />
                  <p className="video-title">{video.snippet.title}</p>
                  <button
                    onClick={() => fetchYoutubeMp3(video.id.videoId)}
                    className="download-button"
                  >
                    Convert to MP3
                  </button>
                </div>
              ) : null
            )}
          </div>

          {/* 🔄 Load More Button */}
          {nextPageToken && (
            <button onClick={() => searchVideos(nextPageToken)} disabled={loading} className="load-more">
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}

      {/* ⚠️ Display Errors */}
      {error && <p>{error}</p>}

      {/* 🎵 Display Download Link */}
      {downloadLink && (
        <div>
          <p>Click below to download MP3:</p>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <button className="download-button">Download MP3</button>
          </a>
        </div>
      )}
    </div>
    </>
  );
}

export default Youtube;
