import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
navigator.serviceWorker
  .register("/path-to/firebase-messaging-sw.js")
  .then((registration) => {
    console.log("Service Worker registered with scope:", registration.scope);
  })
  .catch((error) => {
    console.error("Service Worker registration failed:", error);
  });

root.render(<App />);
