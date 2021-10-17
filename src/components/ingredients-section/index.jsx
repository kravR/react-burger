import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Card from "../card";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";

import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

import { cardObj } from "../../utils/types";

import styles from "./ingredients-section.module.css";

const IngredientsSection = forwardRef(({ title, data }, ref) => {
  const dispatch = useDispatch();
  const { visibleModal } = useSelector((store) => store.ingredient);

  const handleCardDetail = (id) => {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      data: data.find((item) => item._id === id),
    });
  };

  const closeModal = () => {
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
    });
  };

  return (
    <>
      {title && (
        <h3 className="text text_type_main-medium pb-6" ref={ref}>
          {title}
        </h3>
      )}

      {data && (
        <div className={`${styles.section} pt-6 pr-2 pb-6 pl-4`}>
          {data.map((item) => (
            <Card data={item} key={item._id} onDetail={handleCardDetail} />
          ))}
        </div>
      )}

      {visibleModal && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails />
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
