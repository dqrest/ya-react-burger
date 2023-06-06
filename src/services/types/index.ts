import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { store } from '../store';
import { TRegisterReducerAction } from './actions';


export type AppActions = TRegisterReducerAction;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TRegisterReducerAction>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;