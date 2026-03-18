import React from "react";
import { Root } from "react-dom/client";
import { App } from "../App";
import { installMockFetch } from "./mockFetch";

export function renderDevApp(root: Root): void {
  installMockFetch();

  root.render(
    <App
      locale="en"
      env={process.env.REACT_APP_ENV || "dev"}
      getToken={() => Promise.resolve("mock-token")}
      providerId="2"
      providers={{
        "2": { id: 2, name: "Mock Provider" },
      }}
    />
  );
}
