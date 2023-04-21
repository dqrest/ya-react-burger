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

export default function BurgerIngredientItem({ count, ingredient, itemClick }) {

    const click = () => itemClick && itemClick({ ingredient: ingredient });
 


    return (
        <div className={`${biStyle.burgerItem} p-5`} onClick={click}>

            <span className={biStyle.counterIconWrapper}>
                {count > 0 && (<Counter count={count || 0} size="default" extraClass={biStyle.counterIcon} />)}
            </span>
            <img className={biStyle.burgerImage} src={ingredient?.image} >
            </img>
            <div className={`${biStyle.currencyIcon} text text_type_digits-default`}>
                {ingredient?.price} &nbsp; <CurrencyIcon />
            </div>
            <div className='text text_type_main-small' style={{ textAlign: "center" }}>
                {ingredient?.name}
            </div>

        </div>
    );

}

BurgerIngredientItem.propTypes = {
    ingredient: burgerIngredientsItemDto.isRequired,
    count: PropTypes.number.isRequired,
    itemClick: PropTypes.func.isRequired
};