import React from "react";

function BackgroundLoop({
  src,
  poster = "",
  className = "",
  videoClassName = "",
  overlayClassName = "",
  children = null,
  showOverlay = false,
  overlayOpacity = 0.35,
  objectFit = "cover",
  zoom = 1,
  zIndex = -1,
  preload = "metadata",
  ...videoProps
}) {
  if (!src) {
    return null;
  }

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex,
      }}
      aria-hidden="true"
    >
      <video
        className={videoClassName}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        poster={poster}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
        {...videoProps}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showOverlay && (
        <div
          className={overlayClassName}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          }}
        />
      )}

      {children}
    </div>
  );
}

export default BackgroundLoop;
