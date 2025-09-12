import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ScrollIndicator from "../modules/ScrollIndicator";
import "../../css/pages/Art.css"; // ← import the CSS file

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

// --- Manual list (works anywhere) ---
const cadArtImages = [
  {
    src: sixTwo_curve,
    alt: "6,2 Curve",
    title: "3D Product Visualization — 6,2 Curve - Alex",
  },
  {
    src: ornament,
    alt: "Ornament",
    title: "3D Product Visualization — Ornament - Alex",
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
    src: signatureImg,
    alt: "Signature",
    title: "3D Product Visualization Edit — Signature - Alex",
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

  const openModal = (img) => setModalImg(img);
  const closeModal = () => setModalImg(null);

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
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={abstractbackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Foreground content */}
      <div className="site-root">
        <NavBar />

        <main className="art-page-wrapper">
          <div className="art-container">
            <header className="art-header">
              <h1 className="art-title">My CAD Art</h1>
              <p className="art-subtitle">
                A small collection of CAD (Computer‑Aided Design) visuals and
                mechanical design experiment assemblies.
              </p>
            </header>

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
