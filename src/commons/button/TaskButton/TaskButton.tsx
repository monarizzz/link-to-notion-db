import Link from "next/link";
import styles from "./taskButton.module.css";

const TaskButton = ({ taskName }) => {
  return (
    <div>
      <Link href={`?t=${taskName}`} className={styles.taskButtonRoot}>
        {taskName}
      </Link>
    </div>
  );
};

export default TaskButton;
