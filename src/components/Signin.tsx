import { useState } from "react";
import { User } from "../types";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  setSigninOrSignup: (a: string) => void;
  setUserLoggedIn: (a: boolean) => void;
  setUser: (user: User) => void;
};

const Signin: React.FC<Props> = ({ setSigninOrSignup, setUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");

  const handleSigninSubmit = async (username: string, password: string) => {
    setUserError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUserError("Username is required");
    } else if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      try {
        const response = await axios.post(
          `${apiUrl}/login`,
          {
            username: username,
            password: password,
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          const userData = response.data;
          console.log(userData);
          setUser(userData);
        } else if (response.status == 400) {
          setGeneralError(
            "Username and password do not match. Please try again."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        setGeneralError(
          "Username and password do not match. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center content-center">
        <h2 className="my-8 text-4xl font-bold">Login</h2>
        <form>
          <div className="username-box">
            <label className="text-lg">Username: </label>
            <input
              value={username}
              placeholder="Enter your user name"
              onChange={(e) => setUserName(() => e.target.value)}
              className="text-lg h-16 w-36 px-2 m-2  border-2 border-neutral-500  rounded "
            />
            {userError && <p style={{ color: "red" }}>{userError}</p>}
          </div>
          <div className="password-box">
            <label className="text-lg">Password: </label>
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(() => e.target.value)}
              className="text-lg h-16 w-36 px-2 m-2  border-2 border-neutral-500  rounded "
              type="password"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          {generalError && <p style={{ color: "red" }}>{generalError}</p>}
          <div className="flex flex-col items-center justify-center content-center">
            <button
              type="button"
              onClick={() => handleSigninSubmit(username, password)}
              className="bg-yellow-700 hover:bg-yellow-600 text-white  font-bold py-2 px-4 rounded my-8"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <p className="signup-link text-lg">
        Don't have an account?{" "}
        <a
          onClick={() => setSigninOrSignup("Signup")}
          className="text-orange-700 font-bold underline"
        >
          Sign up
        </a>
      </p>
    </>
  );
};

export default Signin;
