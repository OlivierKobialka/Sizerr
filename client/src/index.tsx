import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./i18n";

import Loader from "./Loader";
import { KBarProvider } from "kbar";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
    <KBarProvider>
        <React.StrictMode>
            <React.Suspense fallback={<Loader />}>
                <App />
            </React.Suspense>
        </React.StrictMode>
    </KBarProvider>
);

reportWebVitals();
