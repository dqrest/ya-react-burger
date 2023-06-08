import { FC, useMemo } from "react";

import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { useSelector } from '../../services/hooks';
import { useIngredients } from '../../services/selectors/burger-incredients';

// styles
import oStyle from './order-item.module.css';

const OrderItem: FC<TOrderItem> = ({ order }) => {

    const { items: ingredients } = useSelector(useIngredients);
    const orderIngredients = useMemo(() => ingredients.filter(ing => order.ingredients.includes(ing._id)), [order, ingredients]);

    return <div className={oStyle.orderItemWrapper}>
        <div className={`${oStyle.orderItem} p-5`}>

            <div className={oStyle.header}>
                <div className={oStyle.orderNumber}>
                    <p className={`text text_type_digits-default ${''}`} >#{order.number}</p>
                </div>
                <div className={`text text_type_main-default text_color_inactive ${oStyle.orderDate}`}>
                    <FormattedDate date={new Date(order.createdAt)} />
                </div>
            </div>

            <p className="text text_type_main-medium">
                {order.name}
            </p>

            <div className={oStyle.ingredients}>
                {orderIngredients.map(ing => (
                    <div key={`oi_${ing._id}`}>
                        <img src={ing.image_mobile}></img>                        
                    </div>))
                }
            </div>
            count: {orderIngredients.length}
        </div>

    </div>
}

type TOrderItem = {
    order: TOrderItemDto;
}

export default OrderItem;