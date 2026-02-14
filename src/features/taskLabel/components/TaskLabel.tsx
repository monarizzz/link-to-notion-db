import Image from "next/image";
import styles from "./taskLabel.module.css";
import notionColorMap from "@/libs/notion/constants/colorMap";

type Props = {
  taskName: string;
  size: number;
  color?: string;
};

const TaskLabel = ({ taskName, size, color = "default" }: Props) => {
  const { bg, border } = notionColorMap[color] ?? notionColorMap.default;
  return (
    <div
      className={styles.root}
      style={{ backgroundColor: bg, borderColor: border }}
    >
      <Image src="label.svg" alt="task name" width={size} height={size} />
      <p className={styles.text}>{taskName}</p>
    </div>
  );
};

export default TaskLabel;
