import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("Service Worker Registered!");
    }).catch(err => console.log("Service Worker Registration Failed:", err));
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
