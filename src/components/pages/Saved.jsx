import React from "react";
import { useEffect, useState } from "react";
import ImageFacade from "../../util/api/ImageFacade.js";
import NavBar from "../NavBar.jsx";
import "../../css/Images.css";
import Footer from "../Footer.jsx";
import abstractbackground from "../../assets/0_Abstract_Background_3840x2160.mp4"; // Import the video file

const SavedImages = () => {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await ImageFacade.getSavedImages();
        // Calculate thumbHeight for each image
        const thumbWidth = 500;
        const imagesWithThumb = data.map((img) => ({
          ...img,
          thumbHeight:
            img.width && img.height
              ? Math.round(thumbWidth * (img.height / img.width))
              : 0,
        }));
        setSavedImages(imagesWithThumb);
        if (data.length === 0) {
          setError("No saved images found.");
        }
      } catch (err) {
        setError(
          "Failed to load saved images. <br /> Please try to log in again. <br /> A session expires after 30 minutes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ImageFacade.deleteSavedImage(id);
      setSavedImages((prev) => prev.filter((img) => img.id !== id));
      console.log("Image deleted successfully");
    } catch (err) {
      alert("Failed to delete image.");
    }
  };

  return (
    <>
      <NavBar />
      {sessionStorage.getItem("isLoggedIn") === "true" ? (
        <div className="images-wrapper">
          <div className="images-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="video-bg"
              onLoadStart={() => console.log("Video loading started")}
              onCanPlay={() => console.log("Video can play")}
              onError={(e) => console.log("Video error:", e)}
            >
              <source src={abstractbackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h1 className="images-title"></h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="search-form"
              style={{ marginBottom: "2rem" }}
            >
              <input
                type="text"
                placeholder="Search saved images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </form>

            {loading && <p>Loading saved images...</p>}
            {error && (
              <p
                className="error-message"
                dangerouslySetInnerHTML={{ __html: error }}
              ></p>
            )}

            <div className="image-grid">
              {savedImages
                .filter(
                  (image) =>
                    image.title?.toLowerCase().includes(search.toLowerCase()) ||
                    image.photographer
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
                )
                .sort((a, b) => b.height / b.width - a.height / a.width) // Sort by height/width ratio, highest first
                .map((image) => (
                  <div key={image.id} className="image-card">
                    <a
                      href={image.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="saved-image-item"
                      />
                    </a>
                    <button
                      type="button"
                      className="action-button"
                      onClick={() => handleDelete(image.id)}
                    >
                      Delete
                    </button>
                    <p>
                      <strong>{image.title}</strong>
                    </p>
                    <p>
                      Saved from{" "}
                      <a
                        href={image.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {image.photographer}
                      </a>
                    </p>
                  </div>
                ))}
              {!loading && savedImages.length === 0 && (
                <p className="no-images" style={{ color: "white" }}>
                  You haven’t saved any images yet.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="images-wrapper">
          <div className="images-container">
            <h1 className="images-title">
              Please log in to view your saved images.
            </h1>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SavedImages;
