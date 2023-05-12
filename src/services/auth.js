import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// shared
import { deleteCookie, setCookie, getCookie } from '../shared/utils/cookie';
import { login, logout, getUser, patchUser, refreshAccessToken } from '../services/actions/auth';

import {
    LOGIN_USER_SUCCESS
    , LOGOUT_USER_SUCCESS
    , GET_USER_FAILED
} from './actions/auth';

export function getAuthUser(store) {
    return (
        {
            user: store?.auth?.user
            , request: store?.auth?.request
            , failed: store?.auth?.failed
            , message: store?.auth?.message
            , accessToken: store?.auth?.accessToken
            , refreshToken: store?.auth?.refreshToken
            , actionType: store?.auth?.actionType
        });
}

export function useProvideAuth() {

    const dispatch = useDispatch();
    const { user, request, failed, accessToken, refreshToken, message, actionType } = useSelector(getAuthUser);  

    useEffect(() => {
        switch (actionType) {
            case LOGIN_USER_SUCCESS: {                
                setCookie('token', accessToken, { expires: 1200, path: '/' });
                setCookie('refreshToken', refreshToken, { expires: 2400, path: '/' });
                break;
            }
            case LOGOUT_USER_SUCCESS: {                
                deleteCookie('token', {path: '/'});
                deleteCookie('refreshToken', {path: '/'});
                break;
            }
            case GET_USER_FAILED: {                
                if (message === "jwt expired")
                    updateAccessToken();
                break;
            }
        }
    }, [actionType, accessToken, refreshToken, message])


    const signIn = (formData) => {
        dispatch(login(formData));
    };

    const signOut = () => {
        dispatch(logout(getCookie('refreshToken')));
    };

    const getUserProfile = () => {        
        dispatch(getUser(getCookie('token')));
    };

    const patchUserProfile = (formData) => {
        dispatch(patchUser(getCookie('token'), formData));
    };

    const updateAccessToken = () => {        
        dispatch(refreshAccessToken(getCookie('refreshToken')));
    };

    return {
        user
        , accessToken
        , refreshToken
        , request
        , failed
        , message
        , signIn
        , actionType
        , signOut
        , updateAccessToken
        , getUserProfile
        , patchUserProfile
    };
}
