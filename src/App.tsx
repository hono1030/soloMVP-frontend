import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import DiscoverPage from "./pages/DiscoverPage";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import axios from "axios";
import { User } from "./types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const apiUrl: string = import.meta.env.VITE_API_URL;

const App = () => {
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
    try {
      const response = await axios.get(`${apiUrl}/sessions`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser({
          userid: response.data.userid,
          username: response.data.username,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log("User is not logged in");
          setUser(null); // Clear user state
        } else {
          console.error(
            "An unexpected error occurred:",
            error.response?.data || error.message
          );
        }
      } else {
        console.error("A non-Axios error occurred:", error);
      }
    }
  };

  useEffect(() => {
    checkLogedIn();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white w-full font-serif">
        <Header user={user} handleLogout={handleLogout} />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<Signin setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/map" element={<MapPage user={user} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
