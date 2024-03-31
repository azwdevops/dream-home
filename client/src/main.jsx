import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/app/store";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import "@/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <PersistGate loading={null} persistor={persistor}></PersistGate>
    </Provider>
  </React.StrictMode>
);
