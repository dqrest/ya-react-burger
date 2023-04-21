import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-incredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor-ingredients';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
    , ingredientDetails: ingredientDetailsReducer
    , constructorIngredients: constructorIngredientsReducer
});