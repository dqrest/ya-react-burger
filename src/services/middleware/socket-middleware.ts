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
//import { getCurrentTimestamp } from '../../utils/datetime';
import { useProvideAuth } from '../auth';

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: AppActions) => {
            //const { dispatch } = store;
            const { type } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const { user, accessToken } = useProvideAuth();
            const tokenElems = accessToken?.split(' ') || [];
            const token = tokenElems.length > 0
                ? tokenElems[1]
                : '';
            if (type === wsInit && user) {

                socket = new WebSocket(`${wsUrl}?token=${token}`);
            }
            if (socket) {
                socket.onopen = event => {
                    //dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    //dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData: IMessageResponse = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    //dispatch({ type: onMessage, payload: { ...restParsedData, timestamp: getCurrentTimestamp() } });
                };

                socket.onclose = event => {
                    //dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const payload = action.payload;
                    const message = { ...(payload as IMessage), token: token };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};