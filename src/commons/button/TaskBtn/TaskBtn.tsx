import Link from "next/link";
import styles from "./taskBtn.module.css";

type Props = {
  taskName: string;
};

const TaskButton = ({ taskName }: Props) => {
  return (
    <div>
      <Link href={`?t=${taskName}`} className={styles.taskButtonRoot}>
        {taskName}
      </Link>
    </div>
  );
};

export default TaskButton;
