import { TBurgerIngredientsItemDto } from '../../shared/dtos/burger-ingredients-item-dto';
import { v4 as uuid } from 'uuid';
import { TConstructorIngredientItem } from '../../shared/dtos/burger-ingredients-item-dto';

import {  
    GET_CONSTRUCTOR_INGREDIENTS
    , ADD_CONSTRUCTOR_INGREDIENT
    , DELETE_CONSTRUCTOR_INGREDIENT
    , CHANGE_ORDER_CONSTRUCTOR_INGREDIENTS
    , SET_BUN_TO_CONSTRUCTOR
    , DELETE_ALL_CONSTRUCTOR_INGREDIENTS
} from '../action-types/burger-constructor-ingredients';

import {    
    ISetBunToConstructorAction
    , IDeleteAllConstructorIngredientsAction
    , IAddConstructorIngredientAction
    , IDeleteConstructorIngredientAction
    , IChangeOrderConstructorIngredientsAction
} from '../types/burger-constructor-ingredients';


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
