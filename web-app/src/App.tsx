import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MainPage from "./Components/MainPage";

function App() {
  return (
    <div>
      <div className="text-center">
        <h1 className="font-mono text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Multi-step Upload File Wizard
        </h1>
      </div>
      <MainPage></MainPage>
      <div></div>
    </div>
  );
}
export default App;
