import React, { useEffect, useState } from "react";
import "../../css/modules/ScrollIndicator.css";

const ScrollIndicator = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "End",
      "Home",
      "PageDown",
      "PageUp",
      " ",
    ]);

    const handleScroll = () => {
      setHidden(window.scrollY > 40);
    };

    const hideOnScrollIntent = () => {
      setHidden(true);
    };

    const hideOnKeyboardScroll = (event) => {
      if (scrollKeys.has(event.key)) {
        setHidden(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", hideOnScrollIntent, { passive: true });
    window.addEventListener("touchmove", hideOnScrollIntent, { passive: true });
    window.addEventListener("keydown", hideOnKeyboardScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", hideOnScrollIntent);
      window.removeEventListener("touchmove", hideOnScrollIntent);
      window.removeEventListener("keydown", hideOnKeyboardScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-down-indicator ${hidden ? "hidden" : ""}`}
      aria-hidden={hidden}
    >
      <p>Scroll for more</p>
      <div className="arrow" />
    </div>
  );
};

export default ScrollIndicator;
