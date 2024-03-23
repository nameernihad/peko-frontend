import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store,persistor } from "./Redux/Store";
import App from "./App";
import "./index.css";

import {PersistGate} from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={Store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <PersistGate loading={null}  persistor={persistor}>
        <App />
        </PersistGate>
    </GoogleOAuthProvider>
    </Provider>
);
