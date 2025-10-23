import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "@google/model-viewer";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator";
import "../../css/pages/Art.css"; // ← import the CSS file
import "@google/model-viewer";

// Background video
import abstractbackground from "../../assets/153450-805374052_small-ezgif.com-reverse-video.mp4";

// If using Vite/CRA, keep the import. If on Next.js, place in /public and use const signatureImg = "/signature.png";
import ornament from "../../assets/art/ornament.jpg";
import fourTwo from "../../assets/art/4,2_drop_through.jpg";
import sixTwo_curve from "../../assets/art/6,2_curve.jpg";
import Velo_Snus from "../../assets/art/Velo_Snus.png";
import New_truck_base from "../../assets/art/New_truck_base.png";
import Bicycle_assembly from "../../assets/art/Bicycle_assembly.png";
import signatureImg from "../../assets/art/signature.png";
import signatureRawRender from "../../assets/art/Tagv2.png";
import Sword from "../../assets/art/Sword_v1_2025-Oct-04_11-27-03AM-000_CustomizedView3854553728.png";

const featureModelModules = import.meta.glob(
  "../../assets/art/3dmodels/*.glb",
  {
    eager: true,
  }
);

const FEATURE_MODELS = Object.entries(featureModelModules)
  .map(([path, mod]) => {
    const url = typeof mod === "string" ? mod : mod?.default;

    if (!url) {
      return null;
    }

    const filename = path.split("/").pop() || "model.glb";
    const label = filename
      .replace(/\.glb$/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      url,
      filename,
      label,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.filename.localeCompare(b.filename));

const FEATURE_MODEL = FEATURE_MODELS[0] ?? null;

// --- Manual list (works anywhere) ---
const cadArtImages = [
  {
    src: sixTwo_curve,
    alt: "6,2 Curve",
    title: "3D Product Visualization — 6,2 Curve - Alex",
  },
  
  {
    src: New_truck_base,
    alt: "New Truck Base",
    title: "3D Product Visualization — Truck Base - Alex",
  },
  {
    src: Velo_Snus,
    alt: "Velo Snus",
    title: "3D Product Visualization — Velo Snus - Alex",
  },
  {
    src: Bicycle_assembly,
    alt: "Bicycle Assembly",
    title: "3D Product Visualization — Bicycle - Alex",
  },
  {
    src: fourTwo,
    alt: "4,2 drop through",
    title: "3D Product Visualization — 4,2 drop through - Alex",
  },
  {
    src: signatureRawRender,
    alt: "Tagv2",
    title: "3D Product Visualization — Tagv2 - Alex",
  },
  {
    src: Sword,
    alt: "Sword",
    title: "3D Product Visualization Edit — Sword - Alex",
  },
  // Add more: { src: someImg, alt: "CAD Art 2", title: "Mechanical Design 2" },
];

// --- (Optional) Vite auto-import from /assets/cad
// const autoImported = Object.entries(
// import.meta.glob("../../assets/cad/*.{png,jpg,jpeg,webp}", { eager: true })
// ).map(([path, mod]) => ({ src: mod.default, alt: path.split("/").pop(), title: path.split("/").pop() }));
// const images = autoImported.length ? autoImported : cadArtImages;

// const images = cadArtImages; // switch to the autoImported line above if you enable it

const Art = () => {
  const [modalImg, setModalImg] = useState(null);
  const [activeModel, setActiveModel] = useState(FEATURE_MODEL);

  const openModal = (img) => setModalImg(img);
  const closeModal = () => setModalImg(null);

  const handleModelChange = (event) => {
    const nextModel = FEATURE_MODELS.find(
      (model) => model.filename === event.target.value
    );

    setActiveModel(nextModel ?? null);
  };

  return (
    <>
      <Helmet>
        <title>CAD Art Gallery | 3D Visualizations by Alex</title>
        <meta
          name="description"
          content="Browse a curated collection of CAD art and 3D product visualizations crafted by developer Alex."
        />
      </Helmet>
      {/* Fixed background video */}
      <div className="page-bg">
        {/* <video autoPlay loop muted playsInline className="video-bg">
          <source src={abstractbackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>

      {/* Foreground content */}
      <div className="site-root">
        <NavBar />
        <Helmet>
          <title>CAD Art Gallery | DevDisplay</title>
          <meta property="og:title" content="CAD Art Gallery | DevDisplay" />
          <meta
            property="og:description"
            content="View a curated gallery of CAD art and mechanical design renders."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://devdisplay.online/art" />
          <meta
            property="og:image"
            content="https://devdisplay.online/og/art-page.jpg"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta name="twitter:title" content="CAD Art Gallery | DevDisplay" />
          <meta
            name="twitter:description"
            content="View a curated gallery of CAD art and mechanical design renders."
          />
          <meta
            name="twitter:image"
            content="https://devdisplay.online/og/art-page.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <main className="art-page-wrapper">
          <div className="art-container">
            <header className="art-header">
              <h1 className="art-title">My CAD Art</h1>
              <p className="art-subtitle">
                A collection of CAD (Computer‑Aided Design) visuals and
                mechanical design experiment assemblies.</p>
                <p className="art-description"> <br />
                You can select a model below, drag(right click), zoom(scroll) and rotate(left click) it.
              </p>
            </header>

            <section
              className="feature-model-section"
              aria-label="Featured 3D model preview"
            >
              {activeModel ? (
                <>
                  <model-viewer
                    className="feature-model-viewer"
                    src={activeModel.url}
                    alt={`3D model preview of ${activeModel.label}`}
                    camera-controls
                    auto-rotate
                    autoplay
                    interaction-prompt="none"
                    shadow-intensity="1"
                    exposure="0.9"
                  />
                  <div className="feature-model-actions">
                    {FEATURE_MODELS.length > 1 && (
                      <label className="feature-model-select">
                        <span className="sr-only">Choose a model</span>
                        <select
                          aria-label="Choose a featured model"
                          value={activeModel.filename}
                          onChange={handleModelChange}
                        >
                          {FEATURE_MODELS.map((model) => (
                            <option key={model.filename} value={model.filename}>
                              {model.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    
                  </div>
                </>
              ) : (
                <p className="feature-model-empty">
                  Add <code>.glb</code> files under{" "}
                  <code>src/assets/art/3dmodels</code> to display them here.
                </p>
              )}
            </section>

            {cadArtImages.length === 0 ? (
              <p className="art-empty">
                No images yet — add files under <code>src/assets/cad</code> and
                refresh.
              </p>
            ) : (
              <section className="cad-art-gallery" aria-label="CAD gallery">
                {cadArtImages.map((img, idx) => (
                  <figure className="cad-art-item" key={`${img.src}-${idx}`}>
                    <img
                      src={img.src}
                      alt={img.alt || img.title || `CAD item ${idx + 1}`}
                      className="cad-art-img"
                      loading="lazy"
                      decoding="async"
                      onClick={() => openModal(img)}
                      style={{ cursor: "pointer" }}
                    />
                    {(img.title || img.alt) && (
                      <figcaption className="cad-art-title">
                        {img.title || img.alt}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </section>
            )}
          </div>
        </main>

        <Footer />
      </div>
      <ScrollIndicator />

      {/* Modal for full image */}
      {modalImg && (
        <div className="art-modal" onClick={closeModal}>
          <div
            className="art-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImg.src}
              alt={modalImg.alt || modalImg.title}
              className="art-modal-img"
            />
            <button className="art-modal-close" onClick={closeModal}>
              &times;
            </button>
            {(modalImg.title || modalImg.alt) && (
              <div className="art-modal-caption">
                {modalImg.title || modalImg.alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Art;
