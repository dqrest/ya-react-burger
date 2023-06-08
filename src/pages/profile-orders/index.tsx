import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';

// shared
import {WS_CONNECTION_START_TO_USER_ORDERS } from '../../services/action-types/wsocket';
import { useDispatch } from '../../services/hooks';

export const ProfileOrdersPage = () => {

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch({ type: WS_CONNECTION_START_TO_USER_ORDERS });
        },
        []
    );

    return (
        <div>qqqq</div>
    );
}