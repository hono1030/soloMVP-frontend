import { useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

type Props = {
  setSigninOrSignup: (a: string) => void;
};

const Signup: React.FC<Props> = ({ setSigninOrSignup }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignupSubmit = async (pass: string, confPass: string) => {
    if (pass !== confPass) {
      alert("Passwords do not match.");
    } else {
      try {
        const response = await axios.post(`${apiUrl}/signup`, {
          username: userName,
          password: password,
        });

        // const response = await fetch(signupUrl, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ username: userName, password: password }),
        // });
        if (response.status === 201) {
          alert("Account created successfully. Please log in to continue.");
          setSigninOrSignup("Signin");
        } else {
          alert("Sorry, this username is already taken. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
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
          <div className="password-box">
            <label>Confirm Password: </label>
            <input
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(() => e.target.value)}
              className="password-input"
              type="password"
            />
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
