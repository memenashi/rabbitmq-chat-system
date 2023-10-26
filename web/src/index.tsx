import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setLocale } from "yup";
import { ja } from "yup-locales";

setLocale(ja);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
