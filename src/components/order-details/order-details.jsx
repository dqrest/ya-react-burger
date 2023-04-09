import React from 'react';
import PropTypes from 'prop-types';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import odStyles from './order-details.module.css';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

export default function OrderDetails({ burgers }) {

    // Номер заказа
    const getOrderNumber = () => "034546";

    const refCheckIcon = React.useRef(null);

    React.useEffect(() => {        
        let children = refCheckIcon?.current?.getElementsByTagName("svg");
        if(children && children.length > 0){
            children[0].style.width = "100%";
            children[0].style.height = "120px";            
        }       
    }, []);

    return (
        <div className={odStyles.orderDetailContent} >
            <div className={`text text_type_digits-large`} style={{ alignSelf: "center" }}>
                {getOrderNumber()}
            </div>
            <div className={`text text_type_main-medium mt-8`} style={{alignSelf: "center"}}>
                идентификатор заказа
            </div>            
            <div className={`text text_type_main-medium mt-15 mb-15`} ref={refCheckIcon}>
                <CheckMarkIcon type="primary"  />
            </div>
            <div className={`text text_type_main-small mb-2`} style={{alignSelf: "center"}}>
                Ваш заказ начали готовить
            </div>
            <div className={`text text_type_main-small text_color_inactive`} style={{alignSelf: "center"}}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    );
}

OrderDetails.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}