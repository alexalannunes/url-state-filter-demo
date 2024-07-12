import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnChangeFilter } from "./filter-with-on-change copy.tsx";
import { LinkFilter } from "./filter-with-link.tsx";
import { UrlUniqueStringFilter } from "./filter-with-uniq-url.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<OnChangeFilter />} />
          <Route
            index
            path="/filter-with-on-change"
            element={<OnChangeFilter />}
          />
          <Route path="/filter-with-link" element={<LinkFilter />} />
          <Route
            path="/filter-with-unique-string"
            element={<UrlUniqueStringFilter />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
