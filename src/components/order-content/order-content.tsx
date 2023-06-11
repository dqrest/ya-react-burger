import { FC, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { WS_CONNECTION_START_TO_ALL_ORDERS, WS_CONNECTION_START_TO_USER_ORDERS } from '../../services/action-types/wsocket';
import { getOrders } from '../../services/selectors/wsocket';
import { useDispatch, useSelector } from '../../services/hooks';
import { TOrderState, translateOrderState } from '../../shared/types/order-state';
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { useIngredients } from '../../services/selectors/burger-incredients';

// styles
import ocStyle from './order-content.module.css';

const OrderContent: FC<TConnectionParam> = ({ connection }) => {

    const params = useParams<string>();
    const dispatch = useDispatch();
    const { message } = useSelector(getOrders);
    const { orders } = message
        ? message
        : { orders: [] };

    const order = useMemo(() => orders.find(o => o._id === params.id), [orders, params]);

    const { items: ingredients } = useSelector(useIngredients);

    const groups = useMemo(() => {

        const gs: TGroupedIngredients[] = [];
        ingredients.forEach((ing, id) => {
            const items = order?.ingredients.filter(id => id === ing._id) || [];
            if (items.length === 0) return;
            gs.push({
                ingredient: ing,
                count: items.length
            });
        });

        return gs.sort((a, b) => a.count > b.count ? 1 : -1);
    }, [order, ingredients]);

    const total = useMemo(() => groups.map(g => g.ingredient.price * g.count).reduce((sum, currValue) => sum + currValue, 0), [groups]);

    useEffect(
        () => {
            dispatch({ type: connection });            
        },
        []
    );

    const orderStateClassName = useMemo(() =>
        order?.status === TOrderState.Done
            ? ocStyle.orderStateSuccess
            : order?.status === TOrderState.Canceled
                ? ocStyle.orderStateCanceled
                : '', [order]);

    const orderState = (<div className={`${orderStateClassName} mb-6`} >
        {order?.status && translateOrderState(order.status)}
    </div>);

    return <>
        {!order && (<div>Заказ с идентификатором {params?.id} не найден</div>)}
        {order &&
            (
                <div className={ocStyle.orderContent}>
                    <span className="text text_type_digits-default">#{order.number}</span>
                    <span className="text text_type_main-medium mt-4 mb-4">{order.name}</span>
                    {orderState}
                    <span className="text text_type_main-medium">Состав:</span>
                    <div className={`${ocStyle.ingredients} custom-scroll`}>
                        {groups.map((g, ind) =>
                            <div key={`oi_${uuid()}`} className={`${ocStyle.ingredientItem} mb-2`}>

                                <div key={`oi_${uuid()}`} className={ocStyle.roundImageWrapper}>
                                    <img key={uuid()} src={g.ingredient.image_mobile} className={ocStyle.roundImage}>
                                    </img>
                                </div>

                                <span key={uuid()} className={`${ocStyle.ingredientName} ml-2 text text_type_main-default`}>
                                    {g.ingredient.name}
                                </span>

                                <span key={uuid()} className={`${ocStyle.ingredientPrice} text text_type_digits-default`}>
                                    {g.count}x{g.ingredient.price}
                                    &nbsp;
                                    <CurrencyIcon type="primary" />
                                </span>

                            </div>)
                        }
                    </div>

                    <div className={`${ocStyle.row} mt-2`}>
                        <div className={`text text_type_main-default text_color_inactive ${ocStyle.column1}`}>
                            <FormattedDate date={new Date(order.createdAt)} />
                        </div>
                        <div className={`${ocStyle.column2} text text_type_digits-default`}>
                            {total}
                            &nbsp;
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>

                </div>
            )
        }
    </>;
}

type TConnectionParam = {
    connection: typeof WS_CONNECTION_START_TO_ALL_ORDERS | typeof WS_CONNECTION_START_TO_USER_ORDERS;
}

type TGroupedIngredients = {
    ingredient: TBurgerIngredientsItemDto,
    count: number;
};


export default OrderContent;