import Image from "next/image";
import styles from "./WorkLogCard.module.css";
import DeleteBtn from "@/commons/deleteBtn/components/DeleteBtn";
import TaskLabel from "@/features/taskLabel/components/TaskLabel";
import TimeLabel from "@/features/timeLabel/components/TimeLabel";
import ToNotionBtn from "@/features/toNotionBtn/components/ToNotionBtn";
import { ToRecord } from "@/features/notion/types/toRecord";

type Props = {
  record: ToRecord;
};

const WorkLogCard = ({ record }: Props) => {
  const size = 20;
  return (
    <div className={styles.root}>
      <Image
        src={"done-task.svg"}
        alt="doneTask"
        width={30}
        height={30}
        className={styles.icon}
      />
      <div className={styles.group}>
        <div className={styles.title}>
          {record.detail || "未入力"}
          <div className={styles.actionBtn}>
            <ToNotionBtn url={record.url} size={size} />
            <DeleteBtn size={size} pageId={record.id} />
          </div>
        </div>
        <div className={styles.label}>
          <TaskLabel
            taskName={record.taskName}
            size={size * 0.7}
            color={record.color}
          />
          <TimeLabel start={record.start} end={record.end} size={size * 0.7} />
        </div>
      </div>
    </div>
  );
};

export default WorkLogCard;
