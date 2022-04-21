import { forwardRef } from "react";

import Card from "../card";

import { IProps } from "./types";
import styles from "./styles.module.css";

const IngredientsSection = forwardRef<HTMLDivElement, IProps>(
  ({ title, data }, ref) => {
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
              <Card data={item} key={item._id} />
            ))}
          </div>
        )}
      </>
    );
  }
);

export default IngredientsSection;
