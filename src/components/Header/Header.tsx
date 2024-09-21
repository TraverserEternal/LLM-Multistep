import { FunctionComponent } from "preact";
import styles from "./Header.module.sass";

export const Header: FunctionComponent = () => {
  return <header className={styles.header}></header>;
};
