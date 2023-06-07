import {
    WS_CONNECTION_CLOSED
    , WS_CONNECTION_ERROR
    , WS_CONNECTION_START
    , WS_CONNECTION_SUCCESS
    , WS_GET_MESSAGE
    , WS_SEND_MESSAGE
} from '../action-types/wsocket';

import { IMessage} from './models-data';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
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

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction;