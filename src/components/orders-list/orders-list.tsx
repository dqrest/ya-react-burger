import { FC } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// components
import OrderItem from '../order-item/order-item';

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { TOrderItemArg } from '../order-item/order-item';

const OrdersList: FC<TOrdersList> = ({ orders }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const orderClick = (e: TOrderItemArg) => {        
        if (!e?.order?._id) return;
        navigate('/feed/' + e?.order?._id, { state: { background: location } });
    }

    return (<>
        {orders.map((o, ind) =>
        (<> <OrderItem key={o._id}
            order={o}
            onClick={orderClick} />
            <br key={`br_${o._id}`}/>
        </>
        ))
        }
        <br />
    </>);
}

type TOrdersList = {
    orders: Array<TOrderItemDto>;
}


export default OrdersList;