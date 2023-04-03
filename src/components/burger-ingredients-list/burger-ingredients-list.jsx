import { React, useRef } from 'react';
import PropTypes from 'prop-types';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';

// dtos
import {burgerIngredientsItemDto} from '../../shared/dtos/burger-ingredients-item-dto';

export default function BurgerIngredientsList({ title, burgers }) {        
    return (
        <>
            <span className="text text_type_main-medium">{title}</span>
            <br></br>
            {burgers.map((b) =>
                <BurgerIngredientItem key={b._id} burger={b}></BurgerIngredientItem>
            )}
        </>
    );
}


BurgerIngredientsList.propTypes = {
    title: PropTypes.string,
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto)    
}
