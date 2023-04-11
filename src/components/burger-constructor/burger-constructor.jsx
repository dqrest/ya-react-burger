import React, { useContext, useMemo } from 'react';
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

// shared
import { BurgerContext } from '../../shared/contexts/burger-context';

// styles
import bcStyle from './burger-constructor.module.css';
import appStyle from '../app/app.module.css';

export default function BurgerConstructor() {

    const ingredients = useContext(BurgerContext)?.ingredients || [];

    // Булки
    const buns = ingredients?.filter(i => i.type === 'bun') || [];
    const otherIngredients = useMemo(() => ingredients.filter(i => i.type !== 'bun'));

    const getFirstBun = () => buns.length > 0
        ? buns[0]
        : null;

    const upperBun = getFirstBun();
    const lowerBun = getFirstBun();

    let total = upperBun?.price || 0 + lowerBun?.price || 0;

    const [modalVisible, setModalVisible] = React.useState(false);

    const modal = (
        <Modal setVisible={setModalVisible}>
            <OrderDetails burgers={[upperBun, otherIngredients, lowerBun]}></OrderDetails>
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
                {otherIngredients.map(b => {
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

            <div className={`p-10 ${bcStyle.orderButtonWrapper}`}>
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
}