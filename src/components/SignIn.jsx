import { useState } from "react";

//backend function imports
import { signUpNewUser } from "../backend/backend-functions";

// Initialize Firebase

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value + "@stu.jefferson.kyschools.us");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="password"
        onChange={handlePasswordChange}
      />
      <button
        onClick={() => {
          signUpNewUser(email, password);
        }}
      >
        Submit
      </button>
    </>
  );
}
