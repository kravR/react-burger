import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSection from "../ingredients-section";

import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const { ingredients } = useSelector((store) => store.ingredients);

  const bun = useMemo(() => ingredients?.filter((item) => item.type === "bun"), [ingredients]);
  const sauce = useMemo(() => ingredients?.filter((item) => item.type === "sauce"), [ingredients]);
  const main = useMemo(() => ingredients?.filter((item) => item.type === "main"), [ingredients]);

  const tabs = [
    {
      id: "bun",
      title: "Булки",
      refToSection: useRef(null),
      data: bun
    },
    {
      id: "sauce",
      title: "Соусы",
      refToSection: useRef(null),
      data: sauce
    },
    {
      id: "main",
      title: "Начинки",
      refToSection: useRef(null),
      data: main
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

export default BurgerIngredients;
