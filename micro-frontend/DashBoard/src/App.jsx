import React from "react";
import ReactDOM from "react-dom";

import Dashboard from "./DashBoard";

import "./index.scss";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: DashBoard</div>
    <div>Version: 1.0.0</div>
    <Dashboard />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
