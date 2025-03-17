import React, { useState, useEffect } from "react";
import "../css/Youtube.css";
import NavBar from "./NavBar";

function Youtube() {
  const [searchQuery, setSearchQuery] = useState("trending music"); // ✅ Default query to load initial videos
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  const fetchVideos = (pageToken = "") => {
    setLoading(true);
    setError(null);

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchQuery
    )}&type=video&key=${youtubeApiKey}&maxResults=12&pageToken=${pageToken}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch videos");
        return response.json();
      })
      .then((data) => {
        setSearchResults(pageToken === "" ? data.items : (prevResults) => [...prevResults, ...data.items]);
        setNextPageToken(data.nextPageToken || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching search results. Try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos(); // ✅ Load initial videos on component mount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <>
      <NavBar />
      <div className="youtube-container">
        <h1 className="youtube-title">YouTube MP3 Downloader</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search YouTube videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        {loading && <p>Loading videos...</p>}
        {error && <p className="error-message">Error: {error}</p>}

        <div className="video-grid">
          {searchResults.map((video) => (
            <div key={video.id.videoId} className="video-card">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
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
          ))}
        </div>

        {nextPageToken && (
          <button className="load-more-btn" onClick={() => fetchVideos(nextPageToken)}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default Youtube;