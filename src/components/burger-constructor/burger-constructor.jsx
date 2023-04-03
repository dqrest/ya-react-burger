import React from 'react';
import PropTypes from 'prop-types';

import { 
    ConstructorElement
    , Button
 } from '@ya.praktikum/react-developer-burger-ui-components';

// data, dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

export default class BurgerConstructor extends React.Component {

    constructor(props) {
        super(props);
    }

    // Получить верхнюю булку
    getUpperBun = () => this.props.burgers && this.props.burgers.length > 0
        ? this.props.burgers[0]
        : null;

    getLowerBun = () => this.props.burgers && this.props.burgers.length > 1
        ? this.props.burgers[this.props.burgers.length - 1]
        : null;

    render() {

        var upperBun = this.getUpperBun();
        var lowerBun = this.getLowerBun();

        return (
            <>
                {upperBun && (
                    <ConstructorElement
                        key={upperBun._id}
                        type="top"
                        isLocked={true}
                        text={upperBun.name}
                        price={200}
                        thumbnail={upperBun.image_mobile}
                    />
                )}
                <div className='app-burger-section-content custom-scroll' style={{ height: "100%" }}>
                    {this.props.burgers.map((b) =>                      
                        b._id !== upperBun._id && 
                        b._id !== lowerBun._id &&
                        <ConstructorElement
                            key={b._id}
                            type="top"
                            isLocked={false}
                            text={b.name}
                            price={200}
                            thumbnail={b.image_mobile}
                        />)}
                </div>
                {lowerBun && (
                    <ConstructorElement
                        key={lowerBun._id}
                        type="top"
                        isLocked={true}
                        text={lowerBun.name}
                        price={200}
                        thumbnail={lowerBun.image_mobile}
                    />
                )}
                <div style={{width: "250px"}}>
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