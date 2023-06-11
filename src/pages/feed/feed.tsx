import { useMemo, useEffect } from 'react';

// components
import OrdersList from '../../components/orders-list/orders-list';
import OrdersDesk  from '../../components/orders-desk/orders-desk'; 
// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS } from '../../services/action-types/wsocket';
import { getOrders } from '../../services/selectors/wsocket';
import { useDispatch, useSelector } from '../../services/hooks';

// styles
import { appStyle } from '../../components';

export const FeedPage = () => {

    const dispatch = useDispatch();
    const { message } = useSelector(getOrders);
    const { orders, total, totalToday } = message
        ? message
        : { orders: [], total: 0, totalToday: 0 };

    const sortedOrders = useMemo(() => orders.sort((a, b) => a.createdAt >= b.createdAt ? -1 : 1), [orders]);

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
                        <OrdersList orders={orders} navigateItemUrl={'/feed/'}></OrdersList>
                    </div>
                </div>
                <div className={appStyle.appBurgerSection}>
                    <OrdersDesk orders={sortedOrders} total={total} totalToday={totalToday}></OrdersDesk>
                </div>
            </div>
        </>
        // 
    );
}