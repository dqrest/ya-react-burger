import PropTypes from 'prop-types';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';

// dtos
import { burgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import biListStyle from './burger-ingredients-list.module.css';

export default function BurgerIngredientsList({ title, burgers }) {
    return (
        <>
            <span className={`text text_type_main-medium pt-4 ${biListStyle.burgerListCaption}`} >
                {title}
            </span>            
            {burgers.map((b) =>
                <BurgerIngredientItem key={b._id} burger={b} count={Math.floor(Math.random() * 3)}/>
            )}
        </>
    );
}

BurgerIngredientsList.propTypes = {
    title: PropTypes.string,
    burgers: PropTypes.arrayOf(burgerIngredientsItemDto)
}