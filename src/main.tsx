import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { LocaleProvider } from "./i18n/locale";
import "./globals.css";

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);

// Build menyuntik markup ke #root, jadi tugas client cuma menempelkan listener.
// Dev server masih mengirim root kosong, sehingga harus mount biasa.
if (container.firstElementChild) hydrateRoot(container, tree);
else createRoot(container).render(tree);
