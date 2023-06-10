import { FC, useMemo } from "react";
import { v4 as uuid } from 'uuid';

import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { TOrderItemDto } from '../../shared/dtos/order-item-dto';
import { useSelector } from '../../services/hooks';
import { useIngredients } from '../../services/selectors/burger-incredients';

// styles
import oStyle from './order-item.module.css';

const OrderItem: FC<TOrderItem> = ({ order }) => {

    const { items: ingredients } = useSelector(useIngredients);
    const groups = useMemo(() => {

        const gs: TGroupedIngredients[] = [];
        ingredients.forEach((ing, id) => {
            const items = order.ingredients.filter(id => id === ing._id);
            if (items.length === 0) return;
            gs.push({
                ingredient: ing,
                count: items.length
            });
        });

        return gs.sort((a, b) => a.count > b.count ? 1 : -1);
    }, [order, ingredients]);

    const total = useMemo(() => groups.map(g => g.ingredient.price * g.count).reduce((sum, currValue) => sum + currValue, 0), [groups]);

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

            <p className="text text_type_main-medium mt-4 mb-4">
                {order.name}
            </p>


            <div className={oStyle.body}>
                <div className={`${oStyle.ingredients} custom-scroll`}>
                    {groups.map((g, ind) =>
                        <div key={`oi_${uuid()}`} className={oStyle.roundImageWrapper} style={{ zIndex: groups.length - ind, marginLeft: ind === 0 ? '0px' : '-20px' }}>

                            {g.count > 1 &&
                                <div className={`${oStyle.counter} ${oStyle.small} m-1 text text_type_digits-default`}>
                                    <p className={`${oStyle.counter__num}`}>+{g.count}</p>
                                </div>
                            }

                            <img key={uuid()} src={g.ingredient.image_mobile} className={oStyle.roundImage}>
                            </img>
                        </div>)
                    }
                </div>

                <div className={`${oStyle.price} text text_type_digits-default`}>
                    {total}
                    &nbsp;
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>

    </div>
}

type TOrderItem = {
    order: TOrderItemDto;
}

type TGroupedIngredients = {
    ingredient: TBurgerIngredientsItemDto,
    count: number;
};

export default OrderItem;