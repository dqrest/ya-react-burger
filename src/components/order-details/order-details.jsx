import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import odStyles from './order-details.module.css';

// shared
import { makeOrder } from '../../services/actions/order-details';

// components
import { getConstructorIngredients } from '../burger-constructor/burger-constructor';
import { getCookie } from '../../shared/utils/cookie';

export const getOrderDetails = (store) => ({
    order: store?.orderDetails?.item
    , orderDetailsRequest: store?.orderDetails?.itemRequest
    , orderDetailsFailed: store?.orderDetails?.itemFailed
});

export default function OrderDetails() {

    const dispatch = useDispatch();
    const refCheckIcon = React.useRef(null);  

    const { ingredients, bun } = useSelector(getConstructorIngredients);
    const { order, orderDetailsRequest, orderDetailsFailed } = useSelector(getOrderDetails);   

    // ids = [ingredints, upperBun, lowerBun]
    const ids = useMemo(() => [...ingredients.filter(ing => ing?._id).map(ing => ing._id) || [], bun?._id, bun?._id], [ingredients, bun]);

    useEffect(() => {
        if (bun) dispatch(makeOrder(ids, getCookie('accessToken'), getCookie('refreshToken')));
    }, [dispatch, ids, bun]);

    useEffect(() => {
        let children = refCheckIcon?.current?.getElementsByTagName("svg");
        if (children && children.length > 0) {
            children[0].style.width = "100%";
            children[0].style.height = "120px";
        }        
    }, [orderDetailsRequest, orderDetailsFailed, ingredients]);    

    return (
        <>
            {orderDetailsRequest && <div className='text text_type_main-medium'>Формируется заказ. Ждите...</div>}
            {orderDetailsFailed && <div className='text text_type_main-medium'>Произошла ошибка при оформилении заказа.</div>}
            {
                order?.number && !orderDetailsRequest && !orderDetailsFailed &&
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