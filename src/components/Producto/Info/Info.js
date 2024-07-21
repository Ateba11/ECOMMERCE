import { Container } from "semantic-ui-react";
import styles from "./Info.module.scss";

export function Info(props) {
  const { producto } = props;

  return (
    <Container className={styles.info}>
      <div className={styles.summary}>
      <p>{producto.summary}</p>

      </div>

      <div className={styles.more}>
        <ul>
          <li>
           
          </li>
        </ul>
      </div>
    </Container>
  );
}
