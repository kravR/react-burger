import { FC } from "react";

import { IProps } from "./types";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<IProps> = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose} />;
};

export default ModalOverlay;
