import { FC, forwardRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// components
import BurgerIngredientItem from '../burger-ingredient-item/burger-ingredient-item';

// shared
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { TIngredientArg } from '../burger-ingredient-item/burger-ingredient-item';

// styles
import biListStyle from './burger-ingredients-list.module.css';

export const BurgerIngredientsListInner: FC<TBurgerIngredientsList> = ({ title, ingredients, titleDataTestId }, ref) => {

    const location = useLocation();    
    const navigate = useNavigate();

    const itemClick = (e: TIngredientArg) => {
        if (!e?.ingredient) return;
        navigate('/ingredients/' + e?.ingredient?._id, { state: { background: location } });
    }
    return (
        <>
            <span data-testid={titleDataTestId} className={`text text_type_main-medium mt-2 ${biListStyle.burgerListCaption}`} ref={ref}>
                {title}
            </span>
            {ingredients.map((ing) =>
                <BurgerIngredientItem
                    key={ing._id}
                    ingredient={ing}
                    count={ing.count || 0}
                    itemClick={itemClick} />
            )}
        </>
    );
}

const BurgerIngredientsList = forwardRef<HTMLSpanElement, TBurgerIngredientsList>(({ title, ingredients, titleDataTestId }, ref) => BurgerIngredientsListInner({ title, ingredients, titleDataTestId }, ref));

type TBurgerIngredientsList = {
    title: string;
    ingredients: Array<TBurgerIngredientsItemDto>;
    titleDataTestId?: string;
}

export default BurgerIngredientsList;
