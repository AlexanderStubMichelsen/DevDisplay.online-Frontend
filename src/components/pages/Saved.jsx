import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ImageFacade from "../../util/api/ImageFacade.js";
import NavBar from "../modules/NavBar.jsx";
import Footer from "../modules/Footer.jsx";
import ScrollIndicator from "../modules/ScrollIndicator.jsx";
import "../../css/pages/Images.css";

const SavedImages = () => {
  const [savedImages, setSavedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [userCounts, setUserCounts] = useState({});
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError("");
        
        const data = await ImageFacade.getSavedImages();
        
        if (!data || data.length === 0) {
          setSavedImages([]);
          setError("No saved images found.");
          return;
        }

        // Calculate thumbHeight for each image
        const thumbWidth = 500;
        const imagesWithThumb = data.map((img) => ({
          ...img,
          thumbHeight:
            img.width && img.height
              ? Math.round(thumbWidth * (img.height / img.width))
              : 300, // Default height if dimensions not available
        }));
        
        setSavedImages(imagesWithThumb);

        // Fetch user counts for each image
        const counts = {};
        await Promise.all(
          imagesWithThumb.map(async (image) => {
            try {
              const count = await ImageFacade.getUserCountForImage(image.imageUrl);
              counts[image.imageUrl] = count;
            } catch (err) {
              console.error(`Failed to fetch user count for image ${image.imageUrl}:`, err);
              counts[image.imageUrl] = 0;
            }
          })
        );
        setUserCounts(counts);

      } catch (err) {
        console.error("Failed to load saved images:", err);
        setError("Failed to load saved images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    if (deleting) {
      return;
    }

    try {
      setDeleting(id);
      await ImageFacade.deleteSavedImage(id);
      setSavedImages((prev) => prev.filter((img) => img.id !== id));
      
      // Remove from user counts
      setUserCounts((prev) => {
        const updated = { ...prev };
        delete updated[imageUrl];
        return updated;
      });
      
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const filteredImages = savedImages.filter(
    (image) =>
      image.title?.toLowerCase().includes(search.toLowerCase()) ||
      image.photographer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Saved Images | DevDisplay</title>
        <meta property="og:title" content="Saved Images | DevDisplay" />
        <meta
          property="og:description"
          content="View and manage images you've saved on DevDisplay."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devdisplay.online/saved" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1517817748490-0bfa04a8a8a4?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:title" content="Saved Images | DevDisplay" />
        <meta
          name="twitter:description"
          content="View and manage images you've saved on DevDisplay."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1517817748490-0bfa04a8a8a4?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <NavBar />
      
      <div className="images-wrapper">
        <div className="images-container">
          <h1 className="images-title">My Saved Images</h1>
          <input
            type="text"
            placeholder="Search saved images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="saved-search-input"
          />

          {loading && (
            <div className="loading-message">
              <p>Loading saved images...</p>
            </div>
          )}

          {!loading && error && <p className="error-message">{error}</p>}

          {!loading && filteredImages.length > 0 && (
            <div className="image-grid">
              {filteredImages
                .sort((a, b) => b.thumbHeight - a.thumbHeight)
                .map((image) => (
                  <div key={image.id} className="image-item">
                    <div className="image-wrapper">
                      <a
                        href={image.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="image-link"
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.title || 'Saved image'}
                          className="image"
                          loading="lazy"
                        />
                      </a>
                    </div>
                    
                    <div className="image-content">
                      <div className="image-info">
                        <h3 className="image-title">
                          {image.title || 'Untitled'}
                        </h3>
                        {image.photographer && (
                          <p className="image-photographer">
                            by{' '}
                            <a
                              href={image.sourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="photographer-link"
                            >
                              {image.photographer}
                            </a>
                          </p>
                        )}
                      </div>

                      <div className="image-stats">
                        <span className="user-count">
                          👥 {userCounts[image.imageUrl] || 0} users
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`delete-button ${deleting === image.id ? 'deleting' : ''}`}
                        onClick={() => handleDelete(image.id, image.imageUrl)}
                        disabled={deleting === image.id}
                      >
                        {deleting === image.id ? 'Deleting...' : '🗑️ Delete'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
      <ScrollIndicator />
    </>
  );
};

export default SavedImages;
