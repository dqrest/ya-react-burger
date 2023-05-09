import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-incredients';
import { ingredientDetailsReducer } from './ingredient-details';
import { constructorIngredientsReducer } from './burger-constructor-ingredients';
import { orderDetailsReducer } from './order-details';
import {
    registerReducer
    , loginReducer
    , forgotPasswordReducer
    , authReducer
    //, userProfileReducer
} from './auth';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer
    , ingredientDetails: ingredientDetailsReducer
    , constructorIngredients: constructorIngredientsReducer
    , orderDetails: orderDetailsReducer
    , register: registerReducer
    //, login: loginReducer
    , forgotPassword: forgotPasswordReducer
    , auth: authReducer
    //, userProfile: userProfileReducer
});