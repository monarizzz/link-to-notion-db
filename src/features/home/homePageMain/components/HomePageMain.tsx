import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./HomePageMain.module.css";
import AddWork from "@/commons/addWork/components/AddWork";

type Props = {
  selects: string[];
  records: ToRecord[];
};
const HomePageMain = ({ selects, records }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <AddWork selects={selects} />
      </div>
      {records.map((record) => (
        <div key={record.id} className={styles.card}>
          <WorkLogCard record={record}></WorkLogCard>
        </div>
      ))}
    </div>
  );
};

export default HomePageMain;
