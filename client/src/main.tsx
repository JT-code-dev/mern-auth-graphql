import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<SearchBooks />} />
          <Route path="/saved" element={<SavedBooks />} />
          <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
