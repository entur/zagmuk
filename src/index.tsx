import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { AppShellStandalone } from "./AppShellStandalone";
import "@entur/tokens/dist/styles.css";
import "@entur/chip/node_modules/@entur/tokens/dist/primitive.css";
import "@entur/chip/node_modules/@entur/tokens/dist/semantic.css";
import "@entur/icons/dist/styles.css";
import "@entur/button/dist/styles.css";
import "@entur/loader/dist/styles.css";
import "@entur/typography/dist/styles.css";
import "@entur/menu/dist/styles.css";
import "@entur/a11y/dist/styles.css";
import "@entur/expand/dist/styles.css";
import "@entur/layout/dist/styles.css";
import "@entur/dropdown/dist/styles.css";
import "@entur/chip/dist/styles.css";
import "@entur/form/dist/styles.css";
import "@entur/tooltip/dist/styles.css";
import "@entur/modal/dist/styles.css";
import "./index.css";
import { registerMicroFrontend } from "@entur/micro-frontend";
import { App, AppProps } from "./App";

registerMicroFrontend<AppProps>({
  microFrontendId: "ror-zagmuk",
  mount: (mountPoint, payload) => {
    const root = createRoot(mountPoint as Element);
    root.render(<App {...payload} />);
  },
  unmount: (mountPoint) => {
    const root = createRoot(mountPoint as Element);
    root.unmount();
  },
});

if (import.meta.env.VITE_STANDALONE) {
  const root = ReactDOM.createRoot(document.getElementById("root") as Element);

  if (import.meta.env.VITE_AUTH0_DOMAIN) {
    root.render(
      <AppShellStandalone
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ""}
        audience={import.meta.env.VITE_AUTH0_AUDIENCE || ""}
        redirectUri={`${window.location.origin}${
          import.meta.env.VITE_AUTH0_RELATIVE_CALLBACK_URL
        }`}
      />
    );
  } else {
    import("./dev/renderDevApp").then(({ renderDevApp }) => {
      renderDevApp(root);
    });
  }
}
