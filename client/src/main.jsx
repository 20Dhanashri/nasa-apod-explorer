import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// ------------------------------------------
// 3D Starfield Parallax Motion
// ------------------------------------------
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;

  const l1 = document.querySelector(".layer1");
  const l2 = document.querySelector(".layer2");
  const l3 = document.querySelector(".layer3");

  if (l1 && l2 && l3) {
    l1.style.transform = `translate(${x * 1.2}px, ${y * 1.2}px)`;
    l2.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
    l3.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }
});

// ------------------------------------------
// Mount React App
// ------------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
