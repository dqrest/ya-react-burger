import { useEffect, useMemo } from 'react';

// components
import OrdersList from '../../components/orders-list/orders-list';

// shared
import { WS_CONNECTION_START_TO_USER_ORDERS, WS_CONNECTION_CLOSE_BY_APP } from '../../services/action-types/wsocket';
import { getOrders } from '../../services/selectors/wsocket';
import { useDispatch, useSelector } from '../../services/hooks';

// styles
import poStyle from './profile-orders.module.css';

export const ProfileOrdersPage = () => {

    const dispatch = useDispatch();
    const { message } = useSelector(getOrders);
    const { orders } = message
        ? message
        : { orders: [] };

    const sortedOrders = useMemo(() => orders.sort((a, b) => a.createdAt >= b.createdAt ? -1 : 1), [orders]);

    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START_TO_USER_ORDERS });
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSE_BY_APP });
            };
        },
        []
    );

    return (
        <div className={`${poStyle.ordersContent} custom-scroll`}>
            <OrdersList orders={sortedOrders} navigateItemUrl={'/profile/orders/'}></OrdersList>
        </div>
    );
}