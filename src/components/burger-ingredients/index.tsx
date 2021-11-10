import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSection from "../ingredients-section";
import { ITabsData } from "./types";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("bun");
  const { ingredients } = useSelector((store: any) => store.ingredients);

  const bun = useMemo(
    () => ingredients?.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const sauce = useMemo(
    () => ingredients?.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const main = useMemo(
    () => ingredients?.filter((item) => item.type === "main"),
    [ingredients]
  );

  const tabs: Array<ITabsData> = [
    {
      id: "bun",
      title: "Булки",
      refToSection: useRef<HTMLDivElement>(null),
      data: bun,
    },
    {
      id: "sauce",
      title: "Соусы",
      refToSection: useRef<HTMLDivElement>(null),
      data: sauce,
    },
    {
      id: "main",
      title: "Начинки",
      refToSection: useRef<HTMLDivElement>(null),
      data: main,
    },
  ];

  const handleTabChange = (tab: ITabsData) => () => {
    setCurrentTab(tab.id);
  };

  useEffect(() => {
    let tab = tabs.find((tab) => tab.id === currentTab);

    if (tab && tab.refToSection.current !== null) {
      tab.refToSection.current.scrollIntoView({ behavior: "smooth" });
    }
  });

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
        ))}
      </div>
      <div className={`${styles.ingredients__content} scrollbar`}>
        {tabs.map((tab) => (
          <IngredientsSection
            key={tab.id}
            title={tab.title}
            data={tab.data}
            ref={tab.refToSection}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;
