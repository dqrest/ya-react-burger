import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import odStyles from './order-details.module.css';

// shared
import { IngredientType } from '../../shared/types/ingredient-type';
import { makeOrder } from '../../services/actions/order-details';

export default function OrderDetails() {

    const dispatch = useDispatch();
    const refCheckIcon = React.useRef(null);

    const { ingredients, upperBun, lowerBun } = useSelector(store => {
        const ings = store?.constructorIngredients?.items || [];
        const buns = ings?.filter(i => i.type === IngredientType.Bun) || [];
        const upperBun = buns.length > 0
            ? buns[0]
            : null;
        const lowerBun = buns.length > 1
            ? buns[1]
            : null;
        return {
            ingredients: ings
            , upperBun: upperBun
            , lowerBun: lowerBun
        }
    });

    const ids = useMemo(() => ingredients.filter(ing => ing?._id).map(ing => ing._id) || [], [ingredients]);   
    const { order, orderDetailsRequest, orderDetailsFailed } = useSelector(store => {
        return {
            order: store?.orderDetails?.item
            , orderDetailsRequest: store?.orderDetails?.itemRequest || false
            , orderDetailsFailed: store?.orderDetails?.itemFailed || false
        }
    });

    useEffect(() => {
        if (lowerBun && upperBun)
            dispatch(makeOrder(ids));
    }, [ingredients]);

    useEffect(() => {        
        let children = refCheckIcon?.current?.getElementsByTagName("svg");
        if (children && children.length > 0) {
            children[0].style.width = "100%";
            children[0].style.height = "120px";
        }
    }, [orderDetailsRequest, orderDetailsFailed, ingredients]);

    const notUpperLowerBunMessage = (
        <>
            {!upperBun || !lowerBun
                ? <div className='text text_type_main-medium'>
                    Извините, Вы не добавили булки в список ингредиентов.
                    <br />
                    Добавьте, пожалуйста, верхнюю и/или нижнюю булку в список ингредиентов.
                </div>
                : <></>
            }
        </>
    );

    return (
        <>
            {notUpperLowerBunMessage}
            {orderDetailsRequest && <div className='text text_type_main-medium'>Формируется заказ. Ждите...</div>}
            {orderDetailsFailed && <div className='text text_type_main-medium'>Произошла ошибка при оформилении заказа.</div>}
            {upperBun && lowerBun && !orderDetailsRequest && !orderDetailsFailed &&
                <div className={odStyles.orderDetailContent}>
                    <div className={`text text_type_digits-large`} style={{ alignSelf: "center" }}>
                        {order?.number}
                    </div>
                    <div className={`text text_type_main-medium mt-8`} style={{ alignSelf: "center" }}>
                        идентификатор заказа
                    </div>
                    <div className={`text text_type_main-medium mt-15 mb-15`} ref={refCheckIcon}>
                        <CheckMarkIcon type="primary" />
                    </div>
                    <div className={`text text_type_main-small mb-2`} style={{ alignSelf: "center" }}>
                        Ваш заказ начали готовить
                    </div>
                    <div className={`text text_type_main-small text_color_inactive`} style={{ alignSelf: "center" }}>
                        Дождитесь готовности на орбитальной станции
                    </div>
                </div>
            }
        </>
    );
}