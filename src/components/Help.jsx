import React, { useEffect } from "react";
import "../css/Help.css";
import NavBar from "./NavBar";

function Help() {
  useEffect(() => {
    window.chtlConfig = { chatbotId: "4933274562" };

    const script = document.createElement("script");
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.setAttribute("data-id", "4933274562");
    script.id = "chatling-embed-script";
    document.body.appendChild(script);

    // Cleanup on component unmount
    return () => {
      const widgetScript = document.getElementById("chatling-embed-script");
      if (widgetScript) {
        widgetScript.remove();
      }
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="help" />
    </>
  );
}

export default Help;
