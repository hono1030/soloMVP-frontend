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
    <div className="font-sans ">
      {!user ? (
        <div className="font-sans bg-sand-200">
          <Login setUser={setUser} />
        </div>
      ) : activePrefecture === "" ? (
        <div className="font-sans bg-sand-200">
          <div>
            <div className="static">
              <div className=" h-28 sm:flex sm:justify-between p-6 bg-black">
                <h1 className="font-bold text-white text-4xl mb-4 content-center">
                  Discover Japan (仮)
                </h1>
                <Logout handleLogout={handleLogout} />
              </div>
              <div className=" h-36  p-6 flex items-center justify-center">
                <p className="font-bold text-5xl my-5 ">
                  What kind of trip are you looking for?
                </p>
              </div>
              <Recommendations></Recommendations>
              <div className="sm:flex">
                <div className="flex-none absolute botom-0 ">
                  <JapanMap
                    setActivePrefecture={setActivePrefecture}
                  ></JapanMap>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-sans bg-sand-200">
          <ImageView prefectureCode={activePrefecture}></ImageView>
        </div>
      )}
    </div>
  );
};

export default App;
