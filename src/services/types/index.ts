import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { 
    WS_CONNECTION_START_TO_ALL_ORDERS
    , WS_CONNECTION_START_TO_USER_ORDERS
    , WS_SEND_MESSAGE
    , WS_CONNECTION_SUCCESS
    , WS_CONNECTION_CLOSED
    , WS_CONNECTION_ERROR
    , WS_GET_MESSAGE
} from '../action-types/wsocket';

import { store } from '../store';
import { TRegisterReducerAction, TAuthReducerAction, TForgotPasswordReducerAction, TResetPasswordReducerAction } from './auth';
import { TIngredientsReducerAction } from './burger-incredients';
import { TConstructorIngredientsReducerAction } from './burger-constructor-ingredients';
import { TIngredientDetailsReducerAction } from './ingredient-details';
import { TOrderDetailsReducerAction } from './order-details';
import { TWSActions } from './wsocket';

export type AppActions = TRegisterReducerAction
    | TAuthReducerAction
    | TForgotPasswordReducerAction
    | TResetPasswordReducerAction
    | TIngredientsReducerAction
    | TConstructorIngredientsReducerAction
    | TIngredientDetailsReducerAction
    | TOrderDetailsReducerAction
    | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type TWSStoreActions = {
    wsInitToAllOrders: typeof  WS_CONNECTION_START_TO_ALL_ORDERS,
    wsInitToUserOrders: typeof WS_CONNECTION_START_TO_USER_ORDERS,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
  };