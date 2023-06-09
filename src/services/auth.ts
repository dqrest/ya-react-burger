import { useEffect } from 'react';

// shared
import { deleteCookie, setCookie, getCookie } from '../shared/utils/cookie';
import { TLoginFormData, TUserProfileFormData } from '../shared/types/auth-types';
import {
    login
    , logout
    , getUser
    , patchUser    
} from '../services/actions/auth';
import { useDispatch, useSelector } from './hooks';
import { getAuthUser  } from './selectors/auth';

import {
    LOGIN_USER_SUCCESS
    , LOGOUT_USER_SUCCESS 
} from './action-types/auth';

export function useProvideAuth() {

    const dispatch = useDispatch();
    const { user, request, failed, accessToken, refreshToken, message, actionType } = useSelector(getAuthUser);

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
        , getUserProfile
        , patchUserProfile
    };
}
