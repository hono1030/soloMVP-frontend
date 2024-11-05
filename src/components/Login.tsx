import { useState, useEffect } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import { User } from "../types";

type LoginProps = {
  setUserLoggedIn: (a: boolean) => void;
  setUser: (user: User) => void;
};

const Login: React.FC<LoginProps> = ({ setUserLoggedIn, setUser }) => {
  const [signinOrSignup, setSigninOrSignup] = useState<string>("Signin");

  useEffect(() => {}, [signinOrSignup]);

  return (
    <>
      {signinOrSignup === "Signin" ? (
        <Signin
          setSigninOrSignup={setSigninOrSignup}
          setUserLoggedIn={setUserLoggedIn}
          setUser={setUser}
        />
      ) : (
        <Signup setSigninOrSignup={setSigninOrSignup} />
      )}
    </>
  );
};

export default Login;
