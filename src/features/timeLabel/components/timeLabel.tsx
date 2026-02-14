import workTime from "../utils/workTime";
import Image from "next/image";
import styles from "./timeLabel.module.css";

type Props = {
  start: string;
  end: string;
  size: number;
};

const timeLabel = ({ start, end, size }: Props) => {
  return (
    <div className={styles.root}>
      <Image src="work-time.svg" alt="tag icon" width={size} height={size} />
      <p className={styles.text}>{workTime(start, end)}</p>
    </div>
  );
};

export default timeLabel;
