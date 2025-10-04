import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const BASE = (import.meta as any).env?.BASE_URL ?? "/";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

createRoot(rootEl).render(
	<React.StrictMode>
		{/* Pass BASE to App — App will mount the Router with this basename */}
		<App basename={BASE} />
	</React.StrictMode>
);
