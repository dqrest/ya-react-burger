import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-incredients';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
});