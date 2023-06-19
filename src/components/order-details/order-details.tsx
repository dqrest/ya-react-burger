import { useEffect, useRef } from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import odStyles from './order-details.module.css';

// shared
import { useSelector } from '../../services/hooks';
import { getConstructorIngredients } from '../../services/selectors/burger-constructor-ingredients';
import { useOrderDetails } from '../../services/selectors/order-details';

export default function OrderDetails() {

    const refCheckIcon = useRef<HTMLDivElement>(null);

    const { items: ingredients } = useSelector(getConstructorIngredients);
    const { item, itemRequest, itemFailed } = useSelector(useOrderDetails);  

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


