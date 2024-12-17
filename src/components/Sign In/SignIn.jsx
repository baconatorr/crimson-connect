import { useState } from "react";
import Logo from "../../../public/ram-logo.png";
import { verifyEmail, signUp, logIn, logError } from "../../backend/auth";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";

import styles from "./SignIn.module.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInBranch = async () => {
    if (!(await verifyEmail(email))) {
      const errorMsg = logError("auth/invalid-email");
      handleError(errorMsg);
      return;
    }

    // Try to log in first
    await handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      const errorMsg = logError(error.code);
      console.log("Sign up error:", errorMsg); // Add logging
      handleError(errorMsg); // Correctly set the error message in state
      if (error.code === "auth/email-already-in-use") {
        await handleLogIn();
      }
      return;
    }
    handleLogIn();
  };

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      setUserLoggedIn(); // Set user as logged in in global state
      setNotification("Logged in successfully!");
      handleNav("/homework");
    } catch (error) {
      const errorMsg = logError(error.code);
      console.log("Log in error:", errorMsg); // Add logging
      handleError(errorMsg);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value + "@stu.jefferson.kyschools.us");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleError = (errorMsg) => {
    console.log("Error: ", errorMsg);
    setErrorMessage(errorMsg);
    setErrorDisplay(<ErrorMessage key={errorMsg} message={errorMsg} />);
  };

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sub}>
        {errorDisplay}
        <img src={Logo} alt="RAM Logo" className={styles.logo} />
        <h1 className={styles.h1}>Crimson Connect</h1>
        <div className={styles.email}>
          <input
            type="text"
            spellCheck="false"
            placeholder="Enter your email"
            onChange={handleEmailChange}
          />
          <div className={styles.emailRight}>
            <p className={styles.emailDomain}>@stu.jefferson.kyschools.us</p>
          </div>
        </div>
        <div className={styles.password}>
          <input
            type="password"
            placeholder="password"
            onChange={handlePasswordChange}
          />
          <box-icon
            name="right-arrow-alt"
            color="#757575"
            class="bx bx-right-arrow-alt"
            onClick={async () => {
              console.log("Email: ", email);
              console.log("Password: ", password);
              await logInBranch(email, password);
            }}
          ></box-icon>
        </div>
      </div>
    </div>
  );
}
