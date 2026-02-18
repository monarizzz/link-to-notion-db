import WorkLogCard from "@/commons/workLogCard/components/WorkLogCard";
import { ToRecord } from "@/features/notion/types/toRecord";
import styles from "./Home.module.css";
import AddWork from "@/commons/addWork/components/AddWork";

type Props = {
  records: ToRecord[];
};
const HomePageMain = ({ records }: Props) => {
  //TODO:fix
  const selects = ["開発", "インターン", "雑務"];

  return (
    <>
      <AddWork selects={selects} />
      {records.map((record) => (
        <div key={record.id} className={styles.card}>
          <WorkLogCard record={record}></WorkLogCard>
        </div>
      ))}
    </>
  );
};

export default HomePageMain;
