import React from "react";
import logo from "./logo.svg";
import "./App.css";

//Import functional components from /Components
import UploadVideo from "./Components/UploadVideo";

import SampleForm from "./Components/SampleForm";

function App() {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Multi-step Upload File Wizard
        </h1>
      </div>

      {/* <UploadVideo></UploadVideo> */}
      <SampleForm></SampleForm>
      <div></div>
    </div>
  );
}

export default App;
