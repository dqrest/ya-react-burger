import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import PropTypes from 'prop-types';

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
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import bcStyle from '../burger-constructor/burger-constructor.module.css';

export default function BurgerDraggableConstructorItem(props) {

    const { ingredient, index, isLast } = props;
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: "ordering_ingredient"
        , collect: monitor => ({
            isDrag: monitor.isDragging()
        })
        , item: { index: index }
    });

    const [{ isOverBefore }, beforeDropTarget] = useDrop({
        accept: "ordering_ingredient"
        , drop: payload => dispatch(changeOrderConstructorIngredients(payload.index, index))        
        , collect: (monitor) => ({
            isOverBefore: monitor.isOver(),
        })
    });

    const [{ isOverAfter }, afterDropTarget] = useDrop({
        accept: "ordering_ingredient"
        , drop: payload => dispatch(changeOrderConstructorIngredients(payload.index, index + 1))
        , collect: (monitor) => ({
            isOverAfter: monitor.isOver(),
        })
    });

    return (
        !isDrag &&
        <>
            <div ref={beforeDropTarget} className={`${bcStyle.dropLine}`}>
                <div className={`${isOverBefore && bcStyle.dropLinePainted}`}></div>
            </div>
            <div className={`${bcStyle.dragBurgerItem}`} ref={dragRef}>
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
            {isLast &&
                <div ref={afterDropTarget} className={`${bcStyle.dropLine}`}>
                    <div className={`${isOverAfter && bcStyle.dropLinePainted}`}></div>
                </div>}
        </>
    );
}

BurgerDraggableConstructorItem.propTypes = {
    ingredient: burgerIngredientsItemDto.isRequired
    , index: PropTypes.number.isRequired
    , isLast: PropTypes.bool.isRequired
};
