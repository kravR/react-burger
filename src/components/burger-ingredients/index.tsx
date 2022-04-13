import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../services/hooks";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { getIngredientsData } from "../../services/actions/burger-ingredients";
import IngredientsSection from "../ingredients-section";
import { ITabsData } from "./types";

import styles from "./styles.module.css";

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("bun");
  const { isLoading, isError, ingredients } = useSelector(
    (store) => store.ingredients
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return isLoading ? (
    <h3 className="text text_type_main-default mt-10 mb-5">...загрузка</h3>
  ) : isError ? (
    <h3 className="text text_type_main-default mt-10 mb-5">
      Произошла ошибка при получении данных
    </h3>
  ) : (
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
