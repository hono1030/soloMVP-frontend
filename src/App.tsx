import { useState } from "react";
import Recommendations from "./components/Recommendations";
import JapanMap from "./components/JapanMap";
import ImageView from "./components/ImageView";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";
import axios from "axios";
import { User } from "./types";
const apiUrl: string = import.meta.env.VITE_API_URL;

const App = () => {
  const [activePrefecture, setActivePrefecture] = useState<string>("");
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    if (user) {
      try {
        await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
        setUser(null);
        setUserLoggedIn(false);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  return (
    <>
      {!userLoggedIn || !user ? (
        <Login setUserLoggedIn={setUserLoggedIn} setUser={setUser} />
      ) : activePrefecture === "" ? (
        <div>
          <h1 className="font-bold text-5xl mb-4 content-center">
            Discover Japan (仮)
          </h1>

          <Logout handleLogout={handleLogout} />

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
