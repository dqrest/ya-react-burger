import {
    WS_CONNECTION_CLOSED
    , WS_CONNECTION_ERROR
    , WS_CONNECTION_START_TO_ALL_ORDERS
    , WS_CONNECTION_START_TO_USER_ORDERS
    , WS_CONNECTION_SUCCESS
    , WS_GET_MESSAGE
    , WS_SEND_MESSAGE
    , WS_CONNECTION_CLOSE_BY_APP
} from '../action-types/wsocket';

import { IMessage} from './models-data';

export interface IWSConnectionStartToAllOrders {
    readonly type: typeof WS_CONNECTION_START_TO_ALL_ORDERS;
}

export interface IWSConnectionStartToUserOrders {
    readonly type: typeof WS_CONNECTION_START_TO_USER_ORDERS;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IMessage;
}

export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: { message: string };
}

export interface IWSCloseConnectionByApp {
    readonly type: typeof WS_CONNECTION_CLOSE_BY_APP
}

export type TWSActions =
    | IWSConnectionStartToAllOrders
    | IWSConnectionStartToUserOrders
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction
    | IWSCloseConnectionByApp;