import { SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../action-types/ingredient-details';
import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';

export interface ISetIngredientDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly item?: TBurgerIngredientsItemDto | null;
};

export interface IDeleteIngredientDetailsAction {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
};

export type TIngredientDetailsReducerAction =
    ISetIngredientDetailsAction
    | IDeleteIngredientDetailsAction;