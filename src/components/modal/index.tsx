import { FC, useEffect } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";
import { IProps } from "./types";
import styles from "./modal.module.css";

const Modal: FC<IProps> = ({ title, onClose, children }) => {
  const modalRoot = document.querySelector("#modals") as HTMLElement;

  useEffect(() => {
    const handleClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles["modal__title-wrap"]}>
          <h3 className={`${styles.modal__title} text text_type_main-large`}>
            {title}
          </h3>
          <span className={styles.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </span>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
