import { forwardRef } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Card from "../card";

import {
  SELECT_INGREDIENT,
  OPEN_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

import { useDispatch } from '../../services/hooks';

import { IProps } from "./types";
import styles from "./ingredients-section.module.css";

const IngredientsSection = forwardRef<HTMLDivElement, IProps>(
  ({ title, data }, ref) => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleCardDetail = (id: string) => {
      dispatch({
        type: SELECT_INGREDIENT,
        ingredient: data.find((item) => item._id === id),
      });
      dispatch({
        type: OPEN_INGREDIENT_DETAILS,
      });
      history.push({
        pathname: "/ingredients/" + id,
        state: { background: location },
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
      </>
    );
  }
);

export default IngredientsSection;
