import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../action-types/wsocket';
import { getCurrentTimestamp } from '../../shared/utils/datetime';
import type { IMessage } from '../types/models-data';
import { TWSActions } from '../types/wsocket';

export type TWSState = {
  wsConnected: boolean;
  message?: IMessage;
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  message: undefined
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      const oldOrders = state.message?.orders || [];
      const newOrders = action?.payload?.orders || [];
      newOrders.forEach(newo => {
        const old = oldOrders.find(old => old.key === newo.key)
        if (old) {
          old.orders = newo.orders;
          return;
        }
        oldOrders.push(newo);
      });
      const msg = { ...action.payload, orders: oldOrders };
      return {
        ...state,
        error: undefined,
        message: msg
      };

    default:
      return state;
  }
};