import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

import {
    ConstructorElement
    , DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import {
    deleteConstructorIngredient
    , changeOrderConstructorIngredients
} from '../../services/actions/burger-constructor-ingredients';
import { decreaseIngredientCount } from '../../services/actions/burger-incredients';
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import bcStyle from '../burger-constructor/burger-constructor.module.css';
import bDragStyle from './burger-draggable-constructor-item.module.css';

const BurgerDraggableConstructorItem: FC<TBurgerDraggableConstructorItem> = ({ ...props }) => {

    const { ingredient, index, isLast, isFirst } = props;
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag<TIngredientOrder, unknown, TIngredientDragItemCollectedProps>({
        type: "ordering_ingredient"
        , collect: monitor => ({
            isDrag: monitor.isDragging()
        })
        , item: { index: index }
    });

    const [{ isOverBefore }, beforeDropTarget] = useDrop<TIngredientOrder, unknown, TIngredientDropBeforeCollectedProps>({
        accept: "ordering_ingredient"
        , drop: payload => dispatch(changeOrderConstructorIngredients(payload.index, index))        
        , collect: (monitor) => ({
            isOverBefore: monitor.isOver(),
        })
    });

    const [{ isOverAfter }, afterDropTarget] = useDrop<TIngredientOrder, unknown, TIngredientDropAfterCollectedProps>({
        accept: "ordering_ingredient"
        , drop: payload => dispatch(changeOrderConstructorIngredients(payload.index, index + 1))
        , collect: (monitor) => ({
            isOverAfter: monitor.isOver(),
        })
    });

    return (                 
        !isDrag
            ? <>
                {isFirst && <div ref={beforeDropTarget} className={`${bcStyle.dropLine}`}>
                    <div className={`${isOverBefore && bcStyle.dropLinePainted}`}></div>
                </div>}
                <div className={`${bcStyle.dragBurgerItem}`} ref={dragRef}>
                    <div className={bDragStyle.dragIconWrapper}>
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
                {isLast &&
                    <div ref={afterDropTarget} className={`${bcStyle.dropLine}`}>
                        <div className={`${isOverAfter && bcStyle.dropLinePainted}`}></div>
                    </div>}
            </>
            : <></>
    );
}

type TBurgerDraggableConstructorItem = {
    ingredient: TBurgerIngredientsItemDto;
    index: number;
    isLast: boolean;
    isFirst: boolean;
};

type TIngredientDragItemCollectedProps = {
    isDrag: boolean;
};

type TIngredientDropBeforeCollectedProps = {
    isOverBefore: boolean;
};

type TIngredientDropAfterCollectedProps = {
    isOverAfter: boolean;
};

type TIngredientOrder = {
    index: number;
};

export default BurgerDraggableConstructorItem;
