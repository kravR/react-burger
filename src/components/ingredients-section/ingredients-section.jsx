import PropTypes from "prop-types";

import Card from "../card/card";
import { cardObj } from "../../utils/types";

import styles from "./ingredients-section.module.css";

const IngredientsSection = ({ title, data }) => {
  return (
    <>
      {title && (
        <h3 className="text text_type_main-medium pb-6">{title}</h3>
      )}
      
      {data && (
        <div className={`${styles.section} pt-6 pr-2 pb-6 pl-4`}>
          {data.map((item) => (
            <Card data={item} key={item._id} />
          ))}
        </div>  
      )}
    </>
  );
};

IngredientsSection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(cardObj).isRequired,
};

export default IngredientsSection;
