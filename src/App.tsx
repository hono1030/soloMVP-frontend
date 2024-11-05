import { useEffect, useState } from "react";
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

  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    if (user) {
      try {
        await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
        setUser(null);
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  const checkLogedIn = async () => {
    const response = await axios.get(`${apiUrl}/sessions`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUser({
        userid: response.data.userid,
        username: response.data.username,
      });
    } else {
      console.error("User Not Logged In");
    }
  };

  useEffect(() => {
    checkLogedIn();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {!user ? (
        <Login setUser={setUser} />
      ) : activePrefecture === "" ? (
        <div>
          <h1>Discover Japan (仮)</h1>

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
