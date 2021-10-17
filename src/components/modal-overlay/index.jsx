import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose} />;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;