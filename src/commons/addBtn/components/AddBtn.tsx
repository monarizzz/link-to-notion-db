import Image from "next/image";
import styles from "./AddBtn.module.css";
import postPage from "@/infra/notion/repositories/postPage";
import type { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";

type Props = {
  size: number;
  properties: CreatePageParameters["properties"];
};

const addBt = ({ size, properties }: Props) => {
  const handleClick = async () => {
    await postPage(properties);
  };
  return (
    <button onClick={handleClick} className={styles.root}>
      <Image src="add.svg" alt="add task" width={size} height={size} />
      <span className={styles.text}>記録を追加</span>
    </button>
  );
};

export default addBt;
