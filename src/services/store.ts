import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_TO_ALL_ORDERS,
  WS_CONNECTION_START_TO_USER_ORDERS,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './action-types/wsocket';
import type { TWSStoreActions } from "./types";

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWSStoreActions = {
  wsInitToAllOrders: WS_CONNECTION_START_TO_ALL_ORDERS,
  wsInitToUserOrders: WS_CONNECTION_START_TO_USER_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};


export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions)))
);