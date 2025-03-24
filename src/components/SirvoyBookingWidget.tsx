"use client";

import { useEffect } from "react";

export default function SirvoyBookingWidget() {
  useEffect(() => {
    // Create a script element to load the Sirvoy booking engine
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://secured.sirvoy.com/widget/sirvoy.js";
    script.setAttribute("data-form-id", "bb53d65692fe7622");

    // Append the script to the sirvoy-container div
    const container = document.getElementById('sirvoy-container');
    if (container) {
      container.appendChild(script);
    }

    // Add minimal CSS to prevent horizontal scrolling
    const style = document.createElement('style');
    style.innerHTML = `
      /* Prevent horizontal scrolling */
      body {
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the script and style elements on unmount
    return () => {
      if (container) {
        container.innerHTML = ''; // Remove the script from the container
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div id="sirvoy-container">
      {/* The Sirvoy booking form will be injected here */}
    </div>
  );
}
