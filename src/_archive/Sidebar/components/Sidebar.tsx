import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { content } from "../types/content";

type Props = {
  contents: content[];
};

const Sidebar = ({ contents }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.contentGroup}>
        <Link href={"/"} className={styles.home}>
          <Image
            src={"/sidebar/home.svg"}
            alt={"home"}
            width={30}
            height={30}
            className={styles.icon}
          />
        </Link>
      </div>
      <div className={styles.contentGroup}>
        {contents.map((content) => (
          <Link
            href={`${content.path}`}
            key={content.text}
            className={styles.content}
          >
            <Image
              src={`/sidebar/${content.icon}.svg`}
              alt={`${content.text}`}
              width={20}
              height={20}
              className={styles.icon}
            />
            {content.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
