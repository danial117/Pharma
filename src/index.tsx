import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FetchProvider } from "./context/SearchQueryContext";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FetchProvider>
    <App />
    </FetchProvider>
  </React.StrictMode>
);
