// Homework.js
import styles from "./Homework.module.css";
import { useAuth } from "../../backend/authContext"; // Import useAuth
import TabButton from "./TabButton";
import LoggedIn from "./LoggedIn";

export default function Homework() {
  const { isLoggedIn, notification } = useAuth(); // Access notification and isLoggedIn from context

  return (
    <div className={styles.container}>
      {isLoggedIn && notification && <LoggedIn />} {/* Display notification */}
      <div className="buttons">
        <TabButton message={"Post"} />
        <TabButton message={"Search"} />
        <TabButton message={"Quick Resources"} />
      </div>
    </div>
  );
}
