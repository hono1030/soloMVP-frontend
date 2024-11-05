import { useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  setSigninOrSignup: (a: string) => void;
};

const Signup: React.FC<Props> = ({ setSigninOrSignup }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSignupSubmit = async (pass: string, confPass: string) => {
    setUserError("");
    setPasswordError("");

    if (username.trim() === "") {
      setUserError("Username is required");
    } else if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (confirmPassword.trim() === "") {
      setPasswordError("Confirm Password is required");
    } else if (pass !== confPass) {
      setPasswordError("Passwords do not match.");
    } else {
      try {
        const response = await axios.post(
          `${apiUrl}/signup`,
          {
            username: username,
            password: password,
          },
          { withCredentials: true }
        );

        if (response.status === 201) {
          alert("Account created successfully. Please log in to continue.");
          setSigninOrSignup("Signin");
        } else if (response.status === 400) {
          setUserError(
            "Sorry, this username is already taken. Please try again."
          );
        }
      } catch (error) {
        console.error("Error:", error);
        setUserError(
          "Sorry, this username is already taken. Please try again."
        );
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <h2>Create Account</h2>
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
          </div>
          <div className="password-box">
            <label>Confirm Password: </label>
            <input
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(() => e.target.value)}
              className="password-input"
              type="password"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button
            type="button"
            onClick={() => handleSignupSubmit(password, confirmPassword)}
          >
            SIGN UP
          </button>
        </form>
      </div>
      <p className="signup-link" onClick={() => setSigninOrSignup("Signin")}>
        Already have an account? <a>Login</a>
      </p>
    </>
  );
};

export default Signup;
