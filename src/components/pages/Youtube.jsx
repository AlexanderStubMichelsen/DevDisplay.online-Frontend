import React from "react";
import { useState, useEffect, useCallback } from "react";
import "../../css/Youtube.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4"; // Import the video file

function Youtube() {
  const [searchQuery, setSearchQuery] = useState("trending music"); // ✅ Default query to load initial videos
  const [searchResults, setSearchResults] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchVideos = useCallback(
    (pageToken = "") => {
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
          setSearchResults(
            pageToken === ""
              ? data.items
              : (prevResults) => [...prevResults, ...data.items]
          );
          setNextPageToken(data.nextPageToken || null);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Error fetching search results. Try again.");
          setLoading(false);
        });
    },
    [searchQuery, youtubeApiKey]
  );

  useEffect(() => {
    fetchVideos(); // Call fetchVideos on mount
  }, [fetchVideos]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <>
      <NavBar />
      <div className="youtube-wrapper">
        <div className="youtube-container">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h1 className="youtube-title"></h1>

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
                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                  />
                  <p className="video-title">{video.snippet.title}</p>
                </a>
              </div>
            ))}
          </div>

          {nextPageToken && (
            <button
              type="button"
              className="load-more-btn"
              onClick={() => fetchVideos(nextPageToken)}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Youtube;
