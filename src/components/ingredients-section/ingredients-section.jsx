import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

import Card from "../card/card";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { cardObj } from "../../utils/types";

import styles from "./ingredients-section.module.css";

const IngredientsSection = forwardRef(({title, data}, ref) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);

  const handleCardDetail = (id) => {
    setSelectedCard(data.find((item) => item._id === id));
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  return (
    <>
      {title && <h3 className="text text_type_main-medium pb-6" ref={ref}>{title}</h3>}

      {data && (
        <div className={`${styles.section} pt-6 pr-2 pb-6 pl-4`}>
          {data.map((item) => (
            <Card data={item} key={item._id} onDetail={handleCardDetail} />
          ))}
        </div>
      )}

      {visibleModal && (
        <Modal
          onClose={closeModal}
          title="Детали ингредиента"
        >
          <IngredientDetails data={selectedCard} />
        </Modal>
      )}
    </>
  );
});

IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(cardObj).isRequired,
};

export default IngredientsSection;
