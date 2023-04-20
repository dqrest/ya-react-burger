import React, { useContext, useEffect, useReducer, useMemo } from 'react';

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
import { BurgerContext } from '../../shared/contexts/burger-context';

// api
import { makeOrder } from '../../utils/order-api';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

const initialBurger = {
    ingredients: []
    , upperBun: null
    , lowerBun: null
};

function burgerReducer(state, action) {
    switch (action.type) {
        case 'init':
            return {
                ingredients: action.ingredients
                , upperBun: action.upperBun
                , lowerBun: action.lowerBun
            };
        case 'remove':
            if (!action?.ingredient?._id) return state;
            let ingredients = state?.ingredients || [];
            let ind = ingredients.findIndex(ing => ing?._id === action.ingredient._id);
            ind >= 0 && ingredients.splice(ind, 1);
            return {
                ingredients: ingredients
                , upperBun: state?.upperBun
                , lowerBun: state?.lowerBun
            };
    }
    return initialBurger;
}

export default function BurgerConstructor() {

    const ingredientsFromStorage = useContext(BurgerContext)?.ingredients || [];
    const [stateBurger, dispatchBurger] = useReducer(burgerReducer, initialBurger);

    useEffect(() => {
        // init ingredients from context        
        const buns = ingredientsFromStorage?.filter(i => i.type === 'bun') || [];
        const otherIngredients = ingredientsFromStorage?.filter(i => i.type !== 'bun') || [];

        dispatchBurger({
            ingredients: otherIngredients
            , upperBun: buns.length > 0
                ? buns[0]
                : null
            , lowerBun: buns.length > 1
                ? buns[1]
                : null
            , type: 'init'
        });
    }, []);    

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

    const { upperBun, lowerBun, ingredients } = stateBurger;
    const { isLoading, hasError, order } = stateOrder;
    const total = useMemo(() => (upperBun?.price || 0) + (lowerBun?.price || 0) + (ingredients?.map(ing => ing?.price || 0)?.reduce((sum, currValue) => sum + currValue, 0) || 0), [stateBurger]);

    const modal = (
        <Modal setVisible={() => setStateOrder({...stateOrder, order: null})}>
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

            <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} >
                {
                    ingredients.map(ing => {
                        // total += ing.price;
                        return (
                            <div className={`${bcStyle.dragBurgerItem} mt-4`} key={`${ing._id}_wrapper`}>
                                <DragIcon type="primary" key={`${ing._id}_dragicon`} />
                                <ConstructorElement
                                    key={ing._id}
                                    isLocked={false}
                                    text={ing.name}
                                    price={ing.price}
                                    thumbnail={ing.image_mobile}
                                    extraClass={`${bcStyle.burgerItem}`}
                                    handleClose={() => dispatchBurger({ type: "remove", ingredient: ing })}
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