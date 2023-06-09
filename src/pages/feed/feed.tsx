import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';

// components
import OrdersList from '../../components/orders-list/orders-list';

// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS } from '../../services/action-types/wsocket';
import { getOrders } from '../../services/selectors/wsocket';
import { useDispatch, useSelector } from '../../services/hooks';
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';

// styles
import { appStyle } from '../../components';

export const FeedPage = () => {

    const dispatch = useDispatch();
    const { message } = useSelector(getOrders);
    const { orders } = message
        ? message
        : { orders: [] };

    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START_TO_ALL_ORDERS });
        },
        []
    );

    return (
        <>
            <span className='text text_type_main-large'>
                Лента заказов
            </span>
            <div className={`${appStyle.appBurgerMain}`}>
                <div className={`${appStyle.appBurgerSection} ${appStyle.appBurgerFirstSection}`}>
                    <div className={`${appStyle.appBurgerSectionScrollingContent} custom-scroll`}>
                        <OrdersList orders={orders}></OrdersList>
                    </div>
                </div>
                <div className={appStyle.appBurgerSection}>
                    qq
                </div>
            </div>
        </>
        // 
    );
}