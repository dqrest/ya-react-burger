import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    AppActions,
    TWSStoreActions,
    AppDispatch,
    RootState
} from '../types';
import { IMessageResponse } from '../types/models-data';
import { getCurrentTimestamp } from '../../shared/utils/datetime';
import { getCookie } from '../../shared/utils/cookie';
import { TOrdersKey } from '../../shared/types/order-state';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {

            const { type } = action;
            const { wsInitToAllOrders, wsInitToUserOrders, onOpen, onClose, wsCloseByApp, onError, onMessage } = wsActions;
            const { dispatch, getState } = store;
            const { user } = getState()?.auth;
            const accessToken = getCookie('token');

            const tokenElems = accessToken
                ? `${accessToken}`?.split(' ')
                : '';
            const token = tokenElems.length > 0
                ? tokenElems[1]
                : '';

            if (type === wsInitToAllOrders) {
                socket = new WebSocket(`${wsUrl}/all`);
            }

            if (type === wsInitToUserOrders && user && token.length > 0) {
                socket = new WebSocket(`${wsUrl}?token=${token}`);
            }

            if (type === wsCloseByApp)
                socket && socket.close(1000);

            if (socket) {

                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    //debugger;

                    const { data } = event;
                    const parsedData: IMessageResponse = JSON.parse(data);                   

                    let orderKey: TOrdersKey | undefined = undefined;
                    if (socket?.url && socket.url === `${wsUrl}?token=${token}`)
                        orderKey = TOrdersKey.User;
                    if (socket?.url && socket.url === `${wsUrl}/all`)
                        orderKey = TOrdersKey.All;                       

                    const payload = {
                        timestamp: getCurrentTimestamp()
                        , success: parsedData.success
                        , total: parsedData.total
                        , totalToday: parsedData.totalToday
                        , orders: [{key: orderKey, orders: parsedData.orders}]
                    };

                    dispatch({
                        type: onMessage
                        , payload: payload
                    });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            }
            next(action);
        };
    }) as Middleware;
};