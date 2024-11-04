import { useState } from "react";
import ImageUpload from "./components/UploadImage";
import Recommendations from "./components/Recommendations";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <Recommendations></Recommendations>
        <ImageUpload></ImageUpload>
      </div>
    </>
  );
};

export default App;
