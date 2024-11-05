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

        //   const response = await fetch(signinUrl, {
        //     method: "POST",
        //     credentials: "include",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ username: username, password: password }),
        //   });
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
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="username-box">
            <label>Username: </label>
            <input
              value={username}
              placeholder="Enter your user name"
              onChange={(e) => setUserName(() => e.target.value)}
              className="username-input"
            />
            {userError && <p style={{ color: "red" }}>{userError}</p>}
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
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          {generalError && <p style={{ color: "red" }}>{generalError}</p>}
          <button
            type="button"
            onClick={() => handleSigninSubmit(username, password)}
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
