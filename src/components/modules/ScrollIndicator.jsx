import React, { useEffect, useState } from "react";
import "../../css/modules/ScrollIndicator.css"; // 👈 We'll define styles next

const ScrollIndicator = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`scroll-down-indicator ${hidden ? "hidden" : ""}`}>
      <p>Scroll for more</p>
      <div className="arrow" />
    </div>
  );
};

export default ScrollIndicator;
