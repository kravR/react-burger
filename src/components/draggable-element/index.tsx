import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
} from "../../services/actions/burger-constructor";
import { DECREASE_INGREDIENT_COUNT } from "../../services/actions/burger-ingredients";
import { useDispatch } from "../../services/hooks";

import { IProps } from "./types";
import styles from "./styles.module.css";

const DraggableElement: FC<IProps> = ({ index, item }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "itemBurger",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "itemBurger",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number; id: string }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (clientOffset === null) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch({ type: SORT_INGREDIENTS, dragIndex, hoverIndex });
      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.5 : 1;

  const onDelete = () => {
    dispatch({ type: DELETE_INGREDIENT, id: item.uuid });
    dispatch({
      type: DECREASE_INGREDIENT_COUNT,
      id: item._id,
      qty: 1,
    });
  };

  return (
    <div
      className={`${styles.item} ml-2 mb-4`}
      style={{ opacity }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item?.name}
        thumbnail={item?.image_mobile ? item?.image_mobile : ""}
        price={item?.price}
        handleClose={onDelete}
      />
    </div>
  );
};

export default DraggableElement;
