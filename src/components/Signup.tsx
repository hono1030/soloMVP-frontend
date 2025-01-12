import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userError, setUserError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

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
          navigate("/login");
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
      <div className="flex flex-col items-center justify-center content-center">
        <h2 className="my-8 text-4xl font-bold">Create Account</h2>

        <form>
          <div className="username-box flex flex-col">
            <label className="text-lg">Username </label>
            <input
              value={username}
              placeholder="Enter your user name"
              onChange={(e) => setUserName(() => e.target.value)}
              className="text-lg h-12 w-48 px-2 mb-4  border-2 border-neutral-500  rounded "
            />

            {userError && <p style={{ color: "red" }}>{userError}</p>}
          </div>
          <div className="password-box flex flex-col">
            <label className="text-lg">Password </label>
            <input
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(() => e.target.value)}
              className="text-lg h-12 w-48 px-2 mb-4  border-2 border-neutral-500  rounded "
              type="password"
            />
          </div>
          <div className="password-box flex flex-col">
            <label className="text-lg">Confirm Password </label>
            <input
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(() => e.target.value)}
              className="text-lg h-12 w-48 px-2 mb-4  border-2 border-neutral-500  rounded "
              type="password"
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <div className="flex flex-col items-center justify-center content-center w-48">
            <button
              type="button"
              className="bg-yellow-700 hover:bg-yellow-600 text-white w-full font-bold py-2 px-4 rounded my-8"
              onClick={() => handleSignupSubmit(password, confirmPassword)}
            >
              SIGN UP
            </button>
          </div>
        </form>

        <p className="signup-link text-lg">
          Already have an account?{" "}
          <a
            className="text-orange-700 font-bold underline"
            onClick={() => navigate("/signin")}
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default Signup;
