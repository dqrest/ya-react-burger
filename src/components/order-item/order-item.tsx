import { FC } from "react";

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';

const OrderItem: FC<TOrderItem> = ({order}) => {
    return <>
        {order.name}
    </>
}

type TOrderItem = {    
    order: TOrderItemDto;
}

export default OrderItem;