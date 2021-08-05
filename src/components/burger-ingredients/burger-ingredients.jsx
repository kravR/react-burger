import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSection from "../ingredients-section/ingredients-section";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState("bun");

  const tabs = [
    {
      id: "bun",
      title: "Булки",
      refToSection: useRef(null),
      data: data.filter((item) => item.type === "bun")
    },
    {
      id: "sauce",
      title: "Соусы",
      refToSection: useRef(null),
      data: data.filter((item) => item.type === "sauce")
    },
    {
      id: "main",
      title: "Начинки",
      refToSection: useRef(null),
      data: data.filter((item) => item.type === "main")
    },
  ];

  const handleTabChange = (tab) => () => {
    setCurrentTab(tab.id);
  };

  useEffect(() => {
    tabs
      .find((tab) => tab.id === currentTab)
      .refToSection.current.scrollIntoView({ behavior: "smooth" });
  })

  return (
    <div className={styles.ingredients}>
      <div className={`${styles.ingredients__tabs} mb-10`}>
        {tabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.title}
              active={tab.id === currentTab}
              onClick={handleTabChange(tab)}
            >
              {tab.title}
            </Tab>
          )
        )}
      </div>
      <div className={`${styles.ingredients__content} scrollbar`}>
        {tabs.map((tab) => (
            <IngredientsSection
              key={tab.id}
              title={tab.title}
              data={tab.data}
              ref={tab.refToSection}
            />
          )
        )}
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BurgerIngredients;
