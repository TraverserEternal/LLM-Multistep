import { FunctionComponent } from "preact";
import styles from "./_404.module.sass";

export const NotFound: FunctionComponent = () => {
  return (
    <section className={styles.notFound}>
      <h1>404: Not Found</h1>
      <p>It's gone :(</p>
    </section>
  );
};
