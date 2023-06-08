import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_TO_ALL_ORDERS
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

    case WS_CONNECTION_START_TO_ALL_ORDERS:
      return state;

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
      const msg = { ...action.payload, timestamp: getCurrentTimestamp() };
      return {
        ...state,
        error: undefined,
        message: msg
      };

    default:
      return state;
  }
};