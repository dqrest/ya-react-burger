import React from 'react';
import PropTypes from 'prop-types';

import { 
    CurrencyIcon
    , Counter
 } from '@ya.praktikum/react-developer-burger-ui-components';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

class BurgerIngredientItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <Counter count={1} size="default" extraClass='m-1'></Counter>
            <div className='p-5' style={{ width: "50%", display: "flex", flexDirection: "column", flexShrink: 0, justifyContent: "center" }}>
                
                <img src={this.props.burger?.image} style={{maxWidth: "213px", maxHeight: "107px", alignSelf: "center"}} >
                </img>
                <div className='text text_type_digits-default' style={{justifyContent: "center", display: "flex", alignItems: "center", flexDirection: "row", width: "100%"}}>
                    {this.props.burger?.price} &nbsp; <CurrencyIcon/>
                </div>
                <div className='text text_type_main-small' style={{textAlign: "center"}}>
                    {this.props.burger?.name}
                </div>
                
            </div>            
        );
    }
}

BurgerIngredientItem.propTypes = {
    burger: burgerIngredientsItemDto.isRequired,
    count: PropTypes.number
};

export default BurgerIngredientItem;