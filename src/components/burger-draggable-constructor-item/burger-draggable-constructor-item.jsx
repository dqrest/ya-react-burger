import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

import {
    ConstructorElement
    , Button
    , DragIcon
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import {
    addConstructorIngredient
    , deleteConstructorIngredientsByType
    , deleteConstructorIngredient
    , changeOrderConstructorIngredients
} from '../../services/actions/burger-constructor-ingredients';
import {
    increaseIngredientCount
    , decreaseIngredientCount
    , resetIngredientsCountByType
} from '../../services/actions/burger-incredients';

// styles
import bcStyle from '../burger-constructor/burger-constructor.module.css';
import { useState } from 'react';

export default function BurgerDraggableConstructorItem(props) {

    const { ingredient, index, onDraggedItem, onStartDragging, onEndDragging } = props;
    const { onMouseEnter, onMouseLeave } = props;
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ordering_ingredient"
        , collect: monitor => ({
            isDrag: monitor.isDragging()
        })
        , end: (item, monitor) => {
            onEndDragging && onEndDragging();
           
        }, item: () => {
            const item = {
                orderedIngredient: ingredient,
                index: index
            };
            onStartDragging && onStartDragging({});
            return item;
        }
    });

    const [{ isOverBefore }, beforeDropTarget] = useDrop({
        accept: "ordering_ingredient"
        , drop: (payload) => {
            console.log("order from: " + payload.index + " order to: " + index);
            dispatch(changeOrderConstructorIngredients(payload.index, index));
        }
        , collect: (monitor) => ({
            isOverBefore: monitor.isOver(),
        })
    });

    const [{ isOverAfter }, afterDropTarget] = useDrop({
        accept: "ordering_ingredient"
        , drop: (payload) => {
            console.log("order from: " + payload.index + " order to: " + index);
            dispatch(changeOrderConstructorIngredients(payload.index, index));
        }
        , collect: (monitor) => ({
            isOverAfter: monitor.isOver(),
        })
    });

    return (
        !isDrag &&
        <>
            <div ref={beforeDropTarget} style={{ width: "100%", height: "5px", backgroundColor: isOverBefore ? "blue" : "inherit" }}></div>
            <div className={`${bcStyle.dragBurgerItem}`}
                ref={dragRef}
                style={{ boxSizing: "border-box" }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                <div style={{ cursor: 'pointer' }}>
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    extraClass={`${bcStyle.burgerItem}`}
                    handleClose={() => {
                        dispatch(deleteConstructorIngredient(index));
                        dispatch(decreaseIngredientCount(ingredient._id));
                    }}
                />
            </div>
            <div ref={afterDropTarget} style={{ width: "100%", height: "5px", backgroundColor: isOverAfter ? "blue" : "inherit" }}></div>
        </>
    );
}


/*<div ref={afterDropTarget} style={{ width: "100%", height: "5px", backgroundColor: "gray" }}></div>*/
