import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import odStyles from './order-details.module.css';

// shared
import { makeOrder } from '../../services/actions/order-details';
import { getCookie } from '../../shared/utils/cookie';
import { TOrderState } from '../../services/reducers/order-details';

// dtos
import { getConstructorIngredients } from '../burger-constructor/burger-constructor';

export const useOrderDetails = (store: any): TOrderState => ({
    item: store?.orderDetails?.item
    , itemRequest: store?.orderDetails?.itemRequest
    , itemFailed: store?.orderDetails?.itemFailed
});

export default function OrderDetails() {

    const dispatch = useDispatch();
    const refCheckIcon = useRef<HTMLDivElement>(null);

    const { ingredients, bun } = useSelector(getConstructorIngredients);
    const { item, itemRequest, itemFailed } = useSelector(useOrderDetails);

    // ids = [ingredints, upperBun, lowerBun]
    const ids = useMemo<string[]>(() => [...ingredients.filter(ing => ing?._id).map(ing => ing._id) || [], bun?._id, bun?._id], [ingredients, bun]);

    useEffect(() => {        
        const accessToken = getCookie('token');
        const refreshToken = getCookie('refreshToken');
        if (bun && accessToken && refreshToken) dispatch(makeOrder(ids, accessToken, refreshToken));
    }, [dispatch, ids, bun]);

    useEffect(() => {
        let children = refCheckIcon?.current?.getElementsByTagName("svg");
        if (children && children.length > 0) {
            children[0].style.width = "100%";
            children[0].style.height = "120px";
        }
    }, [itemRequest, itemFailed, ingredients]);

    return (
        <>
            {itemRequest && <div className='text text_type_main-medium'>Формируется заказ. Ждите...</div>}
            {itemFailed && <div className='text text_type_main-medium'>Произошла ошибка при оформилении заказа.</div>}
            {
                item?.number && !itemRequest && !itemFailed &&
                <div className={odStyles.orderDetailContent}>
                    <div className={`text text_type_digits-large ${odStyles.titleCenter}`} >
                        {item?.number}
                    </div>
                    <div className={`text text_type_main-medium mt-8 ${odStyles.titleCenter}`}>
                        идентификатор заказа
                    </div>
                    <div className={`text text_type_main-medium mt-15 mb-15`} ref={refCheckIcon}>
                        <CheckMarkIcon type="primary" />
                    </div>
                    <div className={`text text_type_main-small mb-2 ${odStyles.titleCenter}`}>
                        Ваш заказ начали готовить
                    </div>
                    <div className={`text text_type_main-small text_color_inactive ${odStyles.titleCenter}`}>
                        Дождитесь готовности на орбитальной станции
                    </div>
                </div>
            }

        </>
    );
}


