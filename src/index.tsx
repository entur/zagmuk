import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { AppShellStandalone } from "./AppShellStandalone";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import { registerMicroFrontend } from "@entur/micro-frontend";
import { App, AppProps } from "./App";


registerMicroFrontend<AppProps>({
  microFrontendId: "ror-zagmuk",
  mount: (mountPoint, payload) => {
    render(<App {...payload} />, mountPoint);
  },
  unmount: (mountPoint) => {
    unmountComponentAtNode(mountPoint);
  },
});

if (process.env.REACT_APP_STANDALONE) {
  render(
    <AppShellStandalone
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE || ""}
      redirectUri={`${window.location.origin}${process.env.REACT_APP_AUTH0_RELATIVE_CALLBACK_URL}`}
    />,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
