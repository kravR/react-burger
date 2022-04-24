import { FC, useEffect, SyntheticEvent } from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Modal: FC<IProps> = ({ title, children }) => {
  const history = useHistory();
  const modalRoot = document.querySelector("#modals") as HTMLElement;

  const handleCloseModal = (event: Event | SyntheticEvent | undefined) => {
    event?.stopPropagation();
    history.goBack();
  };

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal(event);
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={handleCloseModal} />
      <div className={styles.modal} id="modal">
        <div className={styles["modal__title-wrap"]}>
          <h3 className={`${styles.modal__title} text text_type_main-large`}>
            {title}
          </h3>
          <span className={styles.modal__close} onClick={handleCloseModal} id="modal-close">
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
