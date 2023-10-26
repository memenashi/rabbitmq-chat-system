import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setLocale } from "yup";
import { ja } from "yup-locales";

setLocale(ja);
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
