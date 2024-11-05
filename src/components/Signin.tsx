import { useState } from "react";
import { User } from "../types";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  setSigninOrSignup: (a: string) => void;
  setUserLoggedIn: (a: boolean) => void;
  setUser: (user: User) => void;
};

const Signin: React.FC<Props> = ({
  setSigninOrSignup,
  setUserLoggedIn,
  setUser,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSigninSubmit = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username: username,
        password: password,
      });

      //   const response = await fetch(signinUrl, {
      //     method: "POST",
      //     credentials: "include",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ username: username, password: password }),
      //   });
      if (response.status === 201) {
        const { authenticationSuccessful, chatUser } = await response.data;
        if (authenticationSuccessful) {
          setUserLoggedIn(true);
          setUser(chatUser);
        }
      } else if (response.status == 500) {
        alert("System Error logging in");
      } else if (response.status == 401) {
        alert("Username and password do not match. Please try again.");
      } else if (response.status == 404) {
        alert("This user account doesn't exist.");
      } else if (response.status == 400) {
        alert("Already logged in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="username-box">
            <label>Username: </label>
            <input
              value={userName}
              placeholder="Enter your user name"
              onChange={(e) => setUserName(() => e.target.value)}
              className="username-input"
            />
          </div>
          <div className="password-box">
            <label>Password: </label>
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(() => e.target.value)}
              className="password-input"
              type="password"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSigninSubmit(userName, password)}
          >
            LOGIN
          </button>
        </form>
      </div>
      <p className="signup-link" onClick={() => setSigninOrSignup("Signup")}>
        Don't have an account? <a>Sign up</a>
      </p>
    </>
  );
};

export default Signin;
