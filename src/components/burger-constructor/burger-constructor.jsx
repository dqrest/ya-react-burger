import React, { useContext, useEffect, useReducer, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import {
    ConstructorElement
    , Button
    , DragIcon
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// shared
import { IngredientType } from '../../shared/types/ingredient-type';
import {
    addConstructorIngredient
    , deleteConstructorIngredientsByType
    , deleteConstructorIngredient
} from '../../services/actions/burger-constructor-ingredients';
import { makeOrder } from '../../utils/order-api';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export default function BurgerConstructor() {

    const dispatch = useDispatch();
    const [, dropTarget] = useDrop({
        accept: "ingredient"
        , drop(payload) {
            switch (payload?.ingredient?.type) {
                case IngredientType.Bun:
                    // delete all buns
                    dispatch(deleteConstructorIngredientsByType(IngredientType.Bun));
                    // add upper and lower buns
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    dispatch(addConstructorIngredient(payload?.ingredient));
                    break;
                default:
                    dispatch(addConstructorIngredient(payload?.ingredient));
            }
        }
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

    const [stateOrder, setStateOrder] = React.useState({
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

            <div ref={dropTarget} className={`${appStyle.appBurgerSectionContent} custom-scroll`} >
                {
                    ingredients.map((ing, ind) => {
                        return (
                            ing.type !== IngredientType.Bun &&
                            <div className={`${bcStyle.dragBurgerItem} mt-4`} key={`${ind}_${ing._id}_wrapper`}>
                                <DragIcon type="primary" key={`${ind}_${ing._id}_dragicon`} />
                                <ConstructorElement
                                    key={`${ind}_{ing._id}`}
                                    isLocked={false}
                                    text={ing.name}
                                    price={ing.price}
                                    thumbnail={ing.image_mobile}
                                    extraClass={`${bcStyle.burgerItem}`}
                                    handleClose={() => dispatch(deleteConstructorIngredient(ind))}
                                />                                
                            </div>
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


BurgerConstructor.propTypes = {
}