import { renderToString } from "react-dom/server";
import App from "./App";

/** Dipakai scripts/build.mjs untuk suntik markup ke dist/index.html sebelum JS jalan. */
export function render() {
  return renderToString(<App />);
}
