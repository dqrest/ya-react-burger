import React from 'react';
import PropTypes from 'prop-types';

import {
    ConstructorElement
    , Button
    , DragIcon
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

// data, dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export default function BurgerConstructor({ burgers }) {

    // Верхняя булка
    const getUpperBun = () => burgers && burgers.length > 0
        ? burgers[0]
        : null;

    // Нижняя булка
    const getLowerBun = () => burgers && burgers.length > 1
        ? burgers[burgers.length - 1]
        : null;

    let upperBun = getUpperBun();
    let lowerBun = getLowerBun();

    let total = upperBun?.price || 0 + lowerBun?.price || 0;

    const [modalVisible, setModalVisible] = React.useState(false);

    const modal = (
        <Modal setVisible={setModalVisible}>
            <OrderDetails burgers={burgers}></OrderDetails>
        </Modal>
    );

    function orderClick() {
        setModalVisible(true);
    }

    return (
        <>
            <div style={{ overflow: 'hidden' }}>
                {modalVisible && modal}
            </div>
            {upperBun && (
                <ConstructorElement
                    key={upperBun._id}
                    type="top"
                    isLocked={true}
                    text={`Верх: ${upperBun.name}`}
                    price={upperBun.price}
                    thumbnail={upperBun.image_mobile}
                    extraClass={`${bcStyle.burgerItem}`}
                />
            )}

            <div className={`${appStyle.appBurgerSectionContent} custom-scroll`} >
                {burgers.map(b => {
                    if (b._id !== upperBun._id && b._id !== lowerBun._id) {
                        total += b.price;
                        return (
                            <div className={`${bcStyle.dragBurgerItem} mt-4`} key={`${b._id}_wrapper`}>
                                <DragIcon type="primary" key={`${b._id}_dragicon`} />
                                <ConstructorElement
                                    key={b._id}
                                    isLocked={false}
                                    text={b.name}
                                    price={b.price}
                                    thumbnail={b.image_mobile}
                                    extraClass={`${bcStyle.burgerItem}`}
                                />
                            </div>
                        )
                    }
                })}
            </div>

            {lowerBun && (
                <ConstructorElement
                    key={lowerBun._id}
                    type="bottom"
                    isLocked={true}
                    text={`Низ: ${lowerBun.name}`}
                    price={lowerBun.price}
                    thumbnail={lowerBun.image_mobile}
                    extraClass={`${bcStyle.burgerItem} mt-4`}
                />
            )}

            <div className={`p-10`} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <span className='text text_type_digits-medium mr-1'>{total}</span>
                <span className='mr-10'><CurrencyIcon /></span>
                <Button htmlType="button" type="primary" size="medium" onClick={orderClick}>
                    Оформить заказ
                </Button>
            </div>
        </>
    );

}


BurgerConstructor.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto).isRequired
}