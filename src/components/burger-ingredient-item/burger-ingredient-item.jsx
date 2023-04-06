import React from 'react';
import PropTypes from 'prop-types';

import {
    CurrencyIcon
    , Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import biStyle from './burger-ingredient-item.module.css';

export default function BurgerIngredientItem({ count, burger }) {

    return (
        <div className={`${biStyle.burgerItem} p-5`}>

            <span style={{height: "32px"}}>
                {count > 0 && (<Counter count={count || 0} size="default" extraClass={biStyle.counterIcon} />)}
            </span>
            <img className={biStyle.burgerImage} src={burger?.image} >
            </img>
            <div className={`${biStyle.currencyIcon} text text_type_digits-default`}>
                {burger?.price} &nbsp; <CurrencyIcon />
            </div>
            <div className='text text_type_main-small' style={{ textAlign: "center" }}>
                {burger?.name}
            </div>

        </div>
    );

}

BurgerIngredientItem.propTypes = {
    burger: burgerIngredientsItemDto.isRequired,
    count: PropTypes.number.isRequired
};