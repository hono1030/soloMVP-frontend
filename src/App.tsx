import { useState } from "react";

import Recommendations from "./components/Recommendations";
import JapanMap from "./components/JapanMap";
import ImageView from "./components/ImageView";
import "./App.css";

const App = () => {
  const [activePrefecture, setActivePrefecture] = useState<string>("");

  return (
    <>
      {activePrefecture === "" ? (
        <div>
          <Recommendations></Recommendations>
          <JapanMap setActivePrefecture={setActivePrefecture}></JapanMap>
        </div>
      ) : (
        <ImageView prefectureCode={activePrefecture}></ImageView>
      )}
    </>
  );
};

export default App;
