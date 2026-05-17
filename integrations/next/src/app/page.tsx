import styles from "./page.module.css";
import PageContent from "../components/PageContent";

export default function Home() {
  return (
    <div className={styles.page}>
      <PageContent />
    </div>
  );
}
