// Homework.js
import styles from "./Homework.module.css";
import TabButton from "./TabButton";
import LoggedIn from "./LoggedIn";

export default function Homework() {
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
