import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./HomePageMain.module.css";
import AddData from "@/commons/addData/components/AddData";

type Props = {
  labels: string[];
  records: ToRecord[];
};
const HomePageMain = ({ labels, records }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <AddData labels={labels} />
      </div>
      <div className={styles.card}>
        {records.map((record) => (
          <WorkLogCard key={record.id} record={record}></WorkLogCard>
        ))}
      </div>
    </div>
  );
};

export default HomePageMain;
