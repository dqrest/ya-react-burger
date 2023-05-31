import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { v4 as uuid } from 'uuid';
import { TConstructorIngredientItem } from '../../shared/dtos/burger-ingredients-item-dto';

export const GET_CONSTRUCTOR_INGREDIENTS = 'GET_CONSTRUCTOR_INGREDIENTS';

export const ADD_CONSTRUCTOR_INGREDIENT = 'ADD_CONSTRUCTOR_INGREDIENT';
export const DELETE_CONSTRUCTOR_INGREDIENT = 'DELETE_CONSTRUCTOR_INGREDIENT';
export const DELETE_ALL_CONSTRUCTOR_INGREDIENTS = 'DELETE_ALL_CONSTRUCTOR_INGREDIENTS';

export const CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS = 'CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS';

export const SET_BUN_TO_CONSTRUCTOR = 'SET_BUN_TO_CONSTRUCTOR';


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

export const getConstructorIngredients = () => (
    { type: GET_CONSTRUCTOR_INGREDIENTS }
);

export const addConstructorIngredient =
    (ingredient: TBurgerIngredientsItemDto): IAddConstructorIngredientAction => {
        const ing: TConstructorIngredientItem = { ...ingredient, uuid: uuid() };
        return {
            type: ADD_CONSTRUCTOR_INGREDIENT
            , item: ing
        };
    };

export const deleteConstructorIngredient =
    (deleteIndex: number): IDeleteConstructorIngredientAction => (
        { type: DELETE_CONSTRUCTOR_INGREDIENT, deleteIndex: deleteIndex }
    );

export const deleteAllConstructorIngredients =
    (): IDeleteAllConstructorIngredientsAction => ({
        type: DELETE_ALL_CONSTRUCTOR_INGREDIENTS
    });

export const changeOrderConstructorIngredients =
    (sourceIndex: number, targetIndex: number): IChangeOrderConstructorIngredientsAction => ({
        type: CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
        , sourceIndex: sourceIndex
        , targetIndex: targetIndex
    });

export const setBunToConstructor =
    (bun?: TBurgerIngredientsItemDto | null): ISetBunToConstructorAction => {

        const ing: TConstructorIngredientItem | undefined = bun
            ? { ...bun, uuid: uuid() }
            : undefined;
            
        return {
            type: SET_BUN_TO_CONSTRUCTOR
            , bun: ing
        }
    };