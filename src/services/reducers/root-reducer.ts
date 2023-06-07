import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-incredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor-ingredients';
import { orderDetailsReducer } from './order-details';
import {
    registerReducer    
    , forgotPasswordReducer
    , authReducer
    , resetPasswordReducer    
} from './auth';
import { wsReducer } from './wsocket';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
    , ingredientDetails: ingredientDetailsReducer
    , constructorIngredients: constructorIngredientsReducer
    , orderDetails: orderDetailsReducer
    , register: registerReducer    
    , forgotPassword: forgotPasswordReducer
    , resetPassword: resetPasswordReducer
    , auth: authReducer
    , orders: wsReducer
});