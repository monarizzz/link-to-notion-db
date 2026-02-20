import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./HomePageMain.module.css";
import AddWork from "@/commons/addWork/components/AddWork";

type Props = {
  selects: string[];
  records: ToRecord[];
};
const HomePageMain = ({ selects, records }: Props) => {
  console.log(records);
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <AddWork selects={selects} />
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
