import React, { useState, useEffect } from "react";
import "../css/Images.css";
import NavBar from "./NavBar";

function Images() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      setError("Missing API Key. Please check your .env file.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&per_page=30&page=1`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch images");
        return response.json();
      })
      .then((data) => {
        const images = data.map((photo) => ({
          id: photo.id,
          url: `${photo.urls.raw}&w=500&dpr=2`, // ✅ Optimized for hotlinking
          alt: photo.alt_description || "Image",
          photographer: photo.user.name,
          profileLink: photo.user.links.html,
        }));
        setImageList(images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="images-container">
        <h1 className="images-title">Images from Unsplash</h1>

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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Images;
