import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import {
    ConstructorElement
    , Button
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerDraggableConstructorItem from '../burger-draggable-constructor-item/burger-draggable-constructor-item';

// shared
import { IngredientType } from '../../shared/types/ingredient-type';
import {
    addConstructorIngredient
    , deleteConstructorIngredientsByType
} from '../../services/actions/burger-constructor-ingredients';
import {
    increaseIngredientCount
    , resetIngredientsCountByType
} from '../../services/actions/burger-incredients';
import { makeOrder } from '../../utils/order-api';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export default function BurgerConstructor() {

    const dispatch = useDispatch();
    const [{ isOver }, dropTarget] = useDrop({
        accept: "ingredient"
        , drop(payload) {
            switch (payload?.ingredient?.type) {
                case IngredientType.Bun:
                    // delete all buns
                    dispatch(deleteConstructorIngredientsByType(IngredientType.Bun));
                    dispatch(resetIngredientsCountByType(IngredientType.Bun));
                    // add upper bun
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    // add lower bun
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    break;
                default:
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    dispatch(increaseIngredientCount(payload?.ingredient?._id));
                    break;
            }
        }
        , collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    });

    const { ingredients, upperBun, lowerBun } = useSelector(store => {
        const ings = store?.constructorIngredients?.items || [];
        const buns = ings?.filter(i => i.type === IngredientType.Bun) || [];
        const upperBun = buns.length > 0
            ? buns[0]
            : null;
        const lowerBun = buns.length > 1
            ? buns[1]
            : null
        return {
            ingredients: ings
            , upperBun: upperBun
            , lowerBun: lowerBun
        }
    });

    const [stateOrder, setStateOrder] = useState({
        isLoading: false,
        hasError: false,
        order: null
    });

    function getOrder(ids) {
        setStateOrder({ ...stateOrder, hasError: false, isLoading: true });
        makeOrder(ids)
            .then(data => setStateOrder({ ...stateOrder, order: data.order, isLoading: false }))
            .catch(e => setStateOrder({ ...stateOrder, hasError: true, isLoading: false }));
    }

    function clickMakeOrder() {
        let ids = ingredients.filter(ing => ing?._id).map(ing => ing._id) || [];
        if (upperBun && lowerBun) {
            ids.push(upperBun._id);
            ids.push(lowerBun._id);
            getOrder(ids);
        }
    }

    const { isLoading, hasError, order } = stateOrder;

    const total = useMemo(() => (ingredients?.map(ing => ing?.price || 0)?.reduce((sum, currValue) => sum + currValue, 0) || 0), [ingredients]);
    const lastIngredientIndex = useMemo(() => ingredients.findLastIndex(ing => ing.type !== IngredientType.Bun), [ingredients]);

    const modal = (
        <Modal setVisible={() => setStateOrder({ ...stateOrder, order: null })}>
            {isLoading && <div className='text text_type_main-medium'>Формируется заказ. Ждите...</div>}
            {hasError && <div className='text text_type_main-medium'>Произошла ошибка при оформилении заказа.</div>}
            {!isLoading && !hasError
                && upperBun && lowerBun && order
                && <OrderDetails order={order} />}
            {!upperBun || !lowerBun
                ? <div className='text text_type_main-medium'>
                    Извините, Вы не добавили булки в список ингредиентов.
                    <br />
                    Добавьте, пожалуйста, верхнюю и/или нижнюю булку в список ингредиентов.
                </div>
                : <></>
            }
        </Modal>
    );

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {order?.number && modal}
            </div>

            {upperBun && (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`Верх: ${upperBun.name}`}
                    price={upperBun.price}
                    thumbnail={upperBun.image_mobile}
                    extraClass={`${bcStyle.burgerItem}`}
                />
            )}

            <div ref={dropTarget} className={`${appStyle.appBurgerSectionContent} custom-scroll ${isOver && appStyle.appBurgerSectionContentBordered}`}>
                {ingredients.length === 0 &&
                    <div className='text text_type_main-medium text_color_inactive' style={{ textAlign: "center" }}>
                        Перетяните сюда инградиенты...
                    </div>
                }
                {
                    ingredients.map((ing, ind) => {
                        return (
                            ing.type !== IngredientType.Bun &&
                            <BurgerDraggableConstructorItem
                                key={`${ind}_${ing._id}_wrapper`}
                                ingredient={ing}
                                index={ind}
                                isLast={ind + 1 > lastIngredientIndex}
                            />
                        )
                    })
                }
            </div>

            {lowerBun && (
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`Низ: ${lowerBun.name}`}
                    price={lowerBun.price}
                    thumbnail={lowerBun.image_mobile}
                    extraClass={`${bcStyle.burgerItem} mt-4`}
                />
            )}

            <div className={`p-10 ${bcStyle.orderButtonWrapper}`}>
                <span className='text text_type_digits-medium mr-1'>{total}</span>
                <span className='mr-10'><CurrencyIcon /></span>
                <Button htmlType="button" type="primary" size="medium" onClick={clickMakeOrder}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}