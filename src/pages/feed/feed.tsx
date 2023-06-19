import { useMemo, useEffect } from 'react';

// components
import OrdersList from '../../components/orders-list/orders-list';
import OrdersDesk  from '../../components/orders-desk/orders-desk'; 
// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS, WS_CONNECTION_CLOSE_BY_APP } from '../../services/action-types/wsocket';
import { getAllOrders } from '../../services/selectors/wsocket';
import { useDispatch, useSelector } from '../../services/hooks';

// styles
import { appStyle } from '../../components';

export const FeedPage = () => {

    const dispatch = useDispatch();    
    const { orders, total, totalToday } = useSelector(getAllOrders);   
    const sortedOrders = useMemo(() => orders.sort((a, b) => a.createdAt >= b.createdAt ? -1 : 1), [orders]);

    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START_TO_ALL_ORDERS });    
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSE_BY_APP });    
            }        
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