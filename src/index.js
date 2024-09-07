import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./cartContext/cartContext";  // Ensure the correct path
import { store, persistor } from "./state/store.js";  // Import from the new store file
import { CMSProvider } from "./cartContext/CmsContext.js";


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <CMSProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        </CMSProvider>
      </CartProvider>
    </PersistGate>
  </Provider>
);