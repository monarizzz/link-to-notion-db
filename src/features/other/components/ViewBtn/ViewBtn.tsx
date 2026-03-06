"use client";
import Link from "next/link";
import styles from "./ViewBtn.module.css";
import { usePathname } from "next/navigation";

type Task = {
  id: string;
  name: string;
};

type Props = {
  tasks: Task[];
};

const ViewButton = ({ tasks }: Props) => {
  const pathname = usePathname();
  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={`${pathname}?v=${task.id}`}
          className={styles.name}
        >
          {task.name}
        </Link>
      ))}
    </div>
  );
};

export default ViewButton;
