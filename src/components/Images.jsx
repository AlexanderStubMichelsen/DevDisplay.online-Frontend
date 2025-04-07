import { useState, useEffect } from "react";
import "../css/Images.css";
import NavBar from "./NavBar";
import ImageFacade from "../api/ImageFacade.js"; // ✅ Import ImageFacade

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
        const images = (searchQuery ? data.results : data).map((photo) => ({
          id: photo.id,
          url: `${photo.urls.raw}&w=500&dpr=2`,
          alt: photo.alt_description || "Image",
          photographer: photo.user.name,
          profileLink: photo.user.links.html,
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
      alert("Image saved successfully!");
    } catch (error) {
      console.error("Save Image Error:", error);
      alert("Error saving image");
    }
  };

  return (
    <>
      <NavBar />
      <div className="images-container">
        <h1 className="images-title">Images from Unsplash</h1>

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
          {imageList.map((image) => (
            <div key={image.id} className="image-card">
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img src={image.url} alt={image.alt} className="image-item" />
              </a>
              <p>
                Photo by{" "}
                <a
                  href={image.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.photographer}
                </a>{" "}
                on Unsplash
              </p>
              {sessionStorage.getItem("isLoggedIn") === "true" && (
                <button
                  className="save-button"
                  onClick={() => handleSaveImage(image)}
                >
                  Save Image to User
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
          Get More
        </button>
      </div>
    </>
  );
}

export default Images;
