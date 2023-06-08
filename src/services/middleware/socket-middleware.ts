import type { Middleware, MiddlewareAPI } from 'redux';

import type {
    AppActions,
    TWSStoreActions,
    //IMessage,
    AppDispatch,
    RootState,
    //IMessageResponse,
} from '../types';
import { IMessage, IMessageResponse } from '../types/models-data';
import { getCurrentTimestamp } from '../../shared/utils/datetime';
import { useProvideAuth } from '../auth';
import { getCookie } from '../../shared/utils/cookie';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {

        // alert('yes1');
        // debugger;
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            const { type } = action;
            const { wsInitToAllOrders, wsInitToUserOrders, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { dispatch, getState } = store;
            const { user } = getState()?.auth;
            const accessToken = getCookie('token');
            
            const tokenElems = accessToken
                ? `${accessToken}`?.split(' ')
                : '';
            const token = tokenElems.length > 0
                ? tokenElems[1]
                : '';       

            if (type === wsInitToAllOrders)
                socket = new WebSocket(`${wsUrl}/all`);

            if (type === wsInitToUserOrders && user && token.length > 0)
                socket = new WebSocket(`${wsUrl}?token=${token}`);


            if (socket) {
                socket.onopen = event => {                    
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {                    
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {                         
                    const { data } = event;
                    const parsedData: IMessageResponse = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: getCurrentTimestamp() } });
                    //dispatch({ type: onMessage, payload: event });
                };

                socket.onclose = event => {
                    //debugger;
                    //dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    //const payload = action.payload;
                    //const message = { ...(payload as IMessage), token: token };
                    //socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};