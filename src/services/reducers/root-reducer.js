import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-incredients';
import { ingredientDetailsReducer} from './ingredient-details';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
    , ingredientDetails: ingredientDetailsReducer
});