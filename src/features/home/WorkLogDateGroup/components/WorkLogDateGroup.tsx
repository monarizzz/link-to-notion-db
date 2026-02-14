import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./WorkLogDateGroup.module.css";

type Props = {
  records: ToRecord[];
};
const WorkLogDateGroup = ({ records }: Props) => {
  return (
    <>
      {records.map((record) => (
        <div key={record.id} className={styles.card}>
          <WorkLogCard record={record}></WorkLogCard>
        </div>
      ))}
    </>
  );
};

export default WorkLogDateGroup;
