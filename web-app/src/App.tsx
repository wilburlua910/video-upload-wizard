import React from "react";
import "./App.css";
import Footer from "./Components/Footer";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <div className="">
      <div className="flex flex-col h-screen justify-between">
        <h1 className="mt-5 font-mono text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
          Multi-step Upload File Wizard
        </h1>
        <MainPage></MainPage>

        <footer className="bg-white dark:bg-gray-900 bottom-0">
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}
export default App;
