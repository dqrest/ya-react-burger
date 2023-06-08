import { FC } from "react";

// components
import OrderItem from '../order-item/order-item';

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';

const OrdersList: FC<TOrdersList> = ({ orders }) => {
    return (<>
        {orders.map((o, ind) =>
        (<> <OrderItem key={o._id}
            order={o} />
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