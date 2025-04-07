import { useEffect, useState } from "react";
import ImageFacade from "../util/api/ImageFacade.js";
import NavBar from "./NavBar";
import "../css/Images.css";

const SavedImages = () => {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await ImageFacade.getSavedImages();
        setSavedImages(data);
      } catch (err) {
        setError("Failed to load saved images");
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
    } catch (err) {
      alert("Failed to delete image.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="images-container">
        <h1 className="saved-title">Your Saved Images</h1>

        {loading && <p>Loading saved images...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="image-grid">
          {savedImages.map((image) => (
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
                className="delete-button"
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
            <p>You haven’t saved any images yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedImages;
