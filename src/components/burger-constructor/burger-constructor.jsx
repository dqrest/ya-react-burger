import React from 'react';
import PropTypes from 'prop-types';

import {
    ConstructorElement
    , Button
    , DragIcon
    , CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// data, dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import bcStyle from './burger-constructor.module.css';

export default class BurgerConstructor extends React.Component {

    constructor(props) {
        super(props);
    }

    // Верхняя булка
    getUpperBun = () => this.props.burgers && this.props.burgers.length > 0
        ? this.props.burgers[0]
        : null;

    // Нижняя булка
    getLowerBun = () => this.props.burgers && this.props.burgers.length > 1
        ? this.props.burgers[this.props.burgers.length - 1]
        : null;

    render() {

        var upperBun = this.getUpperBun();
        var lowerBun = this.getLowerBun();

        let total = upperBun?.price || 0 + lowerBun?.price || 0;

        return (
            <>
                {upperBun && (
                    <ConstructorElement
                        key={upperBun._id}
                        type="top"
                        isLocked={true}
                        text={upperBun.name}
                        price={upperBun.price}
                        thumbnail={upperBun.image_mobile}
                        extraClass={`${bcStyle.burgerItem}`}
                    />
                )}                

                <div className='app-burger-section-content custom-scroll' >
                    {this.props.burgers.map(b => {
                        if (b._id !== upperBun._id && b._id !== lowerBun._id) {                            
                            total+= b.price;
                            return <div className={`mt-4 ml-1 mr-2 ${bcStyle.dragBurgerItem}`} key={`${b._id}_wrapper`}>
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
                        }
                    })}
                </div>

                {lowerBun && (
                    <ConstructorElement
                        key={lowerBun._id}
                        type="bottom"
                        isLocked={true}
                        text={lowerBun.name}
                        price={lowerBun.price}
                        thumbnail={lowerBun.image_mobile}
                        extraClass={`${bcStyle.burgerItem} mt-4`}
                    />
                )}

                <div className={`p-2`} style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                    <span className='text text_type_digits-medium'>{total}</span> &nbsp;
                    <CurrencyIcon ></CurrencyIcon> &nbsp;
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </>
        );
    };
}


BurgerConstructor.propTypes = {
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto)
}