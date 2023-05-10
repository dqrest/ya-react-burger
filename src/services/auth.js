import { useContext, useState, createContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

// shared
import { deleteCookie, setCookie, getCookie } from '../shared/utils/cookie';
import { loginRequest, getUserRequest, logoutRequest } from '../utils/auth-api';
import { login, logout, getUser, patchUser, refreshAccessToken } from '../services/actions/auth';
import { 
    LOGIN_USER_SUCCESS
    , LOGOUT_USER_SUCCESS
 } from './actions/auth';

const test1 = undefined;
const AuthContext = createContext(undefined);

export function ProvideAuth({ children, setSignIn }) {
    const auth = useProvideAuth({ setSignIn });
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

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

export function useProvideAuth({ setSignIn }) {

    const dispatch = useDispatch();
    const { user, request, failed, accessToken, refreshToken, message, actionType } = useSelector(getAuthUser);

    const [isTokenRefreshed, setTokenRefreshed] = useState(false);       

    useEffect(() => {
        console.log(`auth>> request: ${request}, failed: ${failed}, at: ${accessToken}, rt: ${refreshToken}`);        
        // accessToken expired ---> refresh token
        if (!request && failed && message === "jwt expired" && !isTokenRefreshed) {            
            setTokenRefreshed(true);
            updateAccessToken();
        }
    }, [accessToken, refreshToken, request, failed, message]);

    useEffect(() => {
        switch (actionType) {
            case LOGIN_USER_SUCCESS:
                setCookie('token', accessToken, { expires: 100200, path: '/' });
                setCookie('refreshToken', refreshToken, { expires: 400200, path: '/' });
                break;
            case LOGOUT_USER_SUCCESS:
                deleteCookie('token');
                deleteCookie('refreshToken');
                break;
        }
    }, [actionType, accessToken, refreshToken])


    const signIn = (formData) => {        
        dispatch(login(formData));
    };

    const signOut = () => {
        dispatch(logout(getCookie('refreshToken')));        
    };

    const getUserProfile = () => {
        debugger;
        let qq = getCookie('token');
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
