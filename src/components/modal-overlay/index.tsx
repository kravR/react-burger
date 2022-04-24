import { FC } from "react";

import { IProps } from "./types";
import styles from "./styles.module.css";

const ModalOverlay: FC<IProps> = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose} id="modal-overlay" />;
};

export default ModalOverlay;
