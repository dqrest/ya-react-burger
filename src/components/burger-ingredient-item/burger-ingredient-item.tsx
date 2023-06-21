import { FC } from 'react';
import { useDrag } from 'react-dnd'

import {
    CurrencyIcon
    , Counter
} from '@ya.praktikum/react-developer-burger-ui-components';

// dtos
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

// styles
import biStyle from './burger-ingredient-item.module.css';

const BurgerIngredientItem: FC<TBurgerIngredientItem> = ({ count, ingredient, itemClick }) => {

    const click = () => itemClick && itemClick({ ingredient: ingredient });

    const [, dragRef] = useDrag({
        type: "ingredient"
        , item: { ingredient }
    });

    return (
        <div data-testid={`ingredient_${ingredient?._id}`} ref={dragRef} className={`${biStyle.burgerItem} p-5`} onClick={click}>

            <span className={biStyle.counterIconWrapper}>
                {count > 0 && (<Counter count={count || 0} size="default" extraClass={biStyle.counterIcon} />)}
            </span>

            <img className={biStyle.burgerImage} src={ingredient?.image} >
            </img>

            <div className={`${biStyle.currencyIcon} text text_type_digits-default`}>
                {ingredient?.price} &nbsp; <CurrencyIcon type='primary' />
            </div>

            <div className={`text text_type_main-small ${biStyle.textCenter}`}>
                {ingredient?.name}
            </div>

        </div>
    );
}

export type TIngredientArg = {
    ingredient: TBurgerIngredientsItemDto
};

export type TIngredientHandler = (e: TIngredientArg) => void;

type TBurgerIngredientItem = {
    ingredient: TBurgerIngredientsItemDto;
    count: number;
    itemClick: TIngredientHandler;
};

export default BurgerIngredientItem;

