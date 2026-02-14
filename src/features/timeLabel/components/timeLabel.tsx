import workTime from "../utils/workTime";
import Image from "next/image";
import styles from "./TimeLabel.module.css";

type Props = {
  start: string;
  end: string;
  size: number;
};

const TimeLabel = ({ start, end, size }: Props) => {
  return (
    <div className={styles.root}>
      <Image src="work-time.svg" alt="tag icon" width={size} height={size} />
      <span className={styles.text}>{workTime(start, end)}</span>
    </div>
  );
};

export default TimeLabel;
