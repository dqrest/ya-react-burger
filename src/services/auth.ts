import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// shared
import { deleteCookie, setCookie, getCookie } from '../shared/utils/cookie';
import { TLoginFormData, TUserProfileFormData } from '../shared/types/auth-types';
import {
    login
    , logout
    , getUser
    , patchUser
    //, refreshAccessToken
} from '../services/actions/auth';
import { TAuthState } from '../services/reducers/auth';

import {
    LOGIN_USER_SUCCESS
    , LOGOUT_USER_SUCCESS
    , GET_USER_FAILED
    , GET_USER_SUCCESS
    , PATCH_USER_SUCCESS
    , REFRESH_TOKEN_SUCCESS
} from './actions/auth';

export const useAuthUser =
    (store: any): TAuthState => ({
        user: store?.auth?.user
        , request: store?.auth?.request
        , failed: store?.auth?.failed
        , message: store?.auth?.message
        , accessToken: store?.auth?.accessToken
        , refreshToken: store?.auth?.refreshToken
        , actionType: store?.auth?.actionType
    });

export function useProvideAuth() {

    const dispatch = useDispatch();
    const { user, request, failed, accessToken, refreshToken, message, actionType } = useSelector(useAuthUser);

    useEffect(() => {
        switch (actionType) {
            case LOGIN_USER_SUCCESS: {                
                accessToken && setCookie('token', accessToken, { expires: 1200, path: '/' });
                refreshToken && setCookie('refreshToken', refreshToken, { expires: 2400, path: '/' });
                break;
            }
            case LOGOUT_USER_SUCCESS: {                
                deleteCookie('token', {path: '/'});
                deleteCookie('refreshToken', {path: '/'});
                break;
            }            
        }
    }, [actionType, accessToken, refreshToken, message])


    const signIn = (formData: TLoginFormData) => {
        dispatch(login(formData));
    };

    const signOut = () => {
        const refreshToken = getCookie('refreshToken');
        refreshToken && dispatch(logout(refreshToken));
    };

    const getUserProfile = () => {
        const accessToken = getCookie('token');
        const refreshToken = getCookie('refreshToken');
        accessToken && refreshToken && dispatch(getUser(accessToken, refreshToken));
    };

    const patchUserProfile = (formData: TUserProfileFormData) => {
        const accessToken = getCookie('token');
        const refreshToken = getCookie('refreshToken');
        accessToken && refreshToken && dispatch(patchUser(accessToken, formData, refreshToken));
    };

    //const updateAccessToken = () => {       
    //    dispatch(refreshAccessToken(getCookie('refreshToken')));
    //};

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
        //, updateAccessToken
        , getUserProfile
        , patchUserProfile
    };
}
