import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import {  
    GET_CONSTRUCTOR_INGREDIENTS
    , ADD_CONSTRUCTOR_INGREDIENT
    , DELETE_CONSTRUCTOR_INGREDIENT
    , CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
    , SET_BUN_TO_CONSTRUCTOR
    , DELETE_ALL_CONSTRUCTOR_INGREDIENTS
} from '../action-types/burger-constructor-ingredients';


export interface ISetBunToConstructorAction {
    readonly type: typeof SET_BUN_TO_CONSTRUCTOR;
    readonly bun?: TBurgerIngredientsItemDto | null;
}

export interface IDeleteAllConstructorIngredientsAction {
    readonly type: typeof DELETE_ALL_CONSTRUCTOR_INGREDIENTS;
}

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly item: TBurgerIngredientsItemDto;
}

export interface IDeleteConstructorIngredientAction {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
    readonly deleteIndex: number;
}

export interface IChangeOrderConstructorIngredientsAction {
    readonly type: typeof CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS;
    readonly sourceIndex: number;
    readonly targetIndex: number;
}

export type TConstructorIngredientsReducerAction =
    ISetBunToConstructorAction
    | IDeleteAllConstructorIngredientsAction
    | IAddConstructorIngredientAction
    | IDeleteConstructorIngredientAction
    | IChangeOrderConstructorIngredientsAction;