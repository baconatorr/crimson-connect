import styles from "./TabButton.module.css";

export default function TabButton({ message, icon, handleClick }) {
  return (
    <button className={styles.button}>
      <div className="button-content">
        {icon}
        {message}
      </div>
    </button>
  );
}
