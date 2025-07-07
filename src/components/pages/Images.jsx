import React, { useState, useEffect } from "react";
import "../../css/Images.css";
import NavBar from "../NavBar.jsx";
import ImageFacade from "../../util/api/ImageFacade.js";
import Footer from "../Footer.jsx";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4"; // Import the video file

function Images() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = (pageNum, searchQuery = "") => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      setError("Missing API Key. Please check your .env file.");
      setLoading(false);
      return;
    }

    const apiUrl = searchQuery
      ? `https://api.unsplash.com/search/photos/?client_id=${accessKey}&per_page=30&page=${pageNum}&query=${searchQuery}`
      : `https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=30&page=${pageNum}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch images");
        return response.json();
      })
      .then((data) => {
        const thumbWidth = 500;
        const images = (searchQuery ? data.results : data).map((photo) => ({
          id: photo.id,
          url: `${photo.urls.raw}&w=${thumbWidth}&dpr=2`,
          alt: photo.alt_description || "Image",
          photographer: photo.user.name,
          profileLink: photo.user.links.html,
          width: photo.width,
          height: photo.height,
          thumbHeight: Math.round(thumbWidth * (photo.height / photo.width)), // Add this
        }));
        setImageList(
          pageNum === 1 ? images : (prevImages) => [...prevImages, ...images]
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImages(page, query);
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(1, query);
  };

  const handleSaveImage = async (image) => {
    try {
      await ImageFacade.saveImage(image);
      console.log("Image saved successfully!");
    } catch (error) {
      if (error instanceof Response) {
        const errorMsg = await error.text();
        alert(errorMsg);
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("Error saving image.");
      }
      console.error("Save Image Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="images-wrapper">
        <div className="images-container">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="video-bg">
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h1 className="images-title"></h1>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </form>

          {loading && <p>Loading images...</p>}
          {error && <p className="error-message">Error: {error}</p>}

          <div className="image-grid">
            {[...imageList]
              .sort((a, b) => b.thumbHeight - a.thumbHeight)
              .map((image) => (
                <div key={image.id} className="image-card">
                  <a href={image.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="image-item"
                    />
                  </a>

                  <p className="image-title">{image.alt}</p>

                  <p className="photographer">
                    From{" "}
                    <a
                      href={image.profileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="photographer-link"
                    >
                      {image.photographer}
                    </a>
                  </p>

                  {sessionStorage.getItem("isLoggedIn") === "true" && (
                    <button
                      type="button"
                      className="action-button"
                      onClick={() => handleSaveImage(image)}
                    >
                      Save
                    </button>
                  )}
                </div>
              ))}
          </div>

          <button
            type="button"
            className="load-more-btn"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Images;
