import { FC } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// components
import OrderItem from '../order-item/order-item';

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { TOrderItemArg } from '../order-item/order-item';

const OrdersList: FC<TOrdersList> = ({ orders, navigateItemUrl }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const orderClick = (e: TOrderItemArg) => {
        if (!e?.order?._id) return;
        navigate(navigateItemUrl + e?.order?._id, { state: { background: location } });
    }

    return (<>
        {orders.map(o =>
            <OrderItem key={uuid()}
                order={o}
                onClick={orderClick} />
        )}        
    </>);
}

type TOrdersList = {
    orders: Array<TOrderItemDto>;
    navigateItemUrl: string;
}


export default OrdersList;