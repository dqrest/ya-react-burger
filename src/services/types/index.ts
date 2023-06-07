import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { store } from '../store';
import { TRegisterReducerAction, TAuthReducerAction, TForgotPasswordReducerAction, TResetPasswordReducerAction } from './auth';
import { TIngredientsReducerAction } from './burger-incredients';
import { TConstructorIngredientsReducerAction } from './burger-constructor-ingredients';
import { TIngredientDetailsReducerAction } from './ingredient-details';
import { TOrderDetailsReducerAction } from './order-details';

export type AppActions = TRegisterReducerAction
    | TAuthReducerAction
    | TForgotPasswordReducerAction
    | TResetPasswordReducerAction
    | TIngredientsReducerAction
    | TConstructorIngredientsReducerAction
    | TIngredientDetailsReducerAction
    | TOrderDetailsReducerAction;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;