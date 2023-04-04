import React from 'react';
import PropTypes from 'prop-types';

import { 
    CurrencyIcon
    , Counter
 } from '@ya.praktikum/react-developer-burger-ui-components';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

import biStyle from './burger-ingredient-item.module.css';

class BurgerIngredientItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (           
            <div className={`${biStyle.burgerItem} p-5`}>

                {this.props.count > 0 && (<Counter count={this.props.count} size="default" extraClass={biStyle.counterIcon}/>)}                 
                <img className={biStyle.burgerImage} src={this.props.burger?.image} >
                </img>
                <div className={`${biStyle.currencyIcon} text text_type_digits-default`}>
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
    count: PropTypes.number.isRequired
};

export default BurgerIngredientItem;