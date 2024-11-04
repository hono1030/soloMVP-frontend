import { useState } from "react";
import ImageUpload from "./components/UploadImage";
import Recommendations from "./components/Recommendations";
import JapanMap from "./components/JapanMap";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <Recommendations></Recommendations>
        <JapanMap></JapanMap>
        <ImageUpload></ImageUpload>
      </div>
    </>
  );
};

export default App;
