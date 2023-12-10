import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AppProvider } from "./reducers/context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./reducers/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-yrvx6rkotuhctbfd.us.auth0.com"
    clientId="vmqCfiR64vwnq41RXOBmpA8WSuMD9PZ9"
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </UserProvider>
  </Auth0Provider>
);
