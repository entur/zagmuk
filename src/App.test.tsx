import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";

test("renders app", async () => {
  render(<App />);
});
