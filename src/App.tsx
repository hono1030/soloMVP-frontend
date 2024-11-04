import { useState } from "react";
import ImageUpload from "./components/UploadImage";
import SubmitPreference from "./components/SubmitPreferene";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Hello World</h1>
        <SubmitPreference></SubmitPreference>
        <ImageUpload></ImageUpload>
      </div>
    </>
  );
}

export default App;
