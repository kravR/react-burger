import { useState } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSection from "../ingredients-section/ingredients-section";

import styles from "./burger-ingredients.module.css";

const tabs = {
  bun: 0,
  sauce: 1,
  main: 2,
};

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(tabs.bun);

  const handleTabChange = (tab) => () => setCurrentTab(tab);

  const bunData = data.filter((item) => item.type === "bun");
  const sauceData = data.filter((item) => item.type === "sauce");
  const mainData = data.filter((item) => item.type === "main");

  return (
    <div className={styles.ingredients}>
      <div className={`${styles.ingredients__tabs} mb-10`}>
        <Tab
          value={`${tabs.bun}`}
          active={currentTab === tabs.bun}
          onClick={handleTabChange(tabs.bun)}
        >
          Булки
        </Tab>
        <Tab
          value={`${tabs.sauce}`}
          active={currentTab === tabs.sauce}
          onClick={handleTabChange(tabs.sauce)}
        >
          Соусы
        </Tab>
        <Tab
          value={`${tabs.main}`}
          active={currentTab === tabs.main}
          onClick={handleTabChange(tabs.main)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients__content} scrollbar`}>
        {currentTab === tabs.bun && (
          <IngredientsSection title="Булки" data={bunData} />
        )}
        {currentTab === tabs.sauce && (
          <IngredientsSection title="Соусы" data={sauceData} />
        )}
        {currentTab === tabs.main && (
          <IngredientsSection title="Начинки" data={mainData} />
        )}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  array: PropTypes.array,
};

export default BurgerIngredients;
