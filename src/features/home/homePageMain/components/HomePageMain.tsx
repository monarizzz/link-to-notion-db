import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./HomePageMain.module.css";
import AddWork from "@/commons/addWork/components/AddWork";

type Props = {
  records: ToRecord[];
};
const HomePageMain = ({ records }: Props) => {
  //TODO:fix
  const selects = ["インターン", "雑務"];

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
