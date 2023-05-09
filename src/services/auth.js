import { useContext, useState, createContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// shared
import { deleteCookie, setCookie, getCookie } from '../shared/utils/cookie';
import { loginRequest, getUserRequest, logoutRequest } from '../utils/auth-api';
import { login, logout, getUser, patchUser, refreshAccessToken } from '../services/actions/auth';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
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
        });
}

export function useProvideAuth() {

    const dispatch = useDispatch();
    const { user, request, failed, accessToken, refreshToken, message } = useSelector(getAuthUser);

    const [isTokenRefreshed, setTokenRefreshed] = useState(false);

    useEffect(() => {
        console.log(`auth>> request: ${request}, failed: ${failed}, at: ${accessToken}, rt: ${refreshToken }`);
        // get valid accessToken ---> setCookie
        if (accessToken && !request && !failed)
            setCookie('token', accessToken, { expires: 100200, path: '/' });

        // get valid refreshToken ---> setCookie
        if (refreshToken && !request && !failed) {
            setCookie('refreshToken', refreshToken, { expires: 400200, path: '/' });
            setTokenRefreshed(false);
        }

        // accessToken expired ---> refresh token
        if (!request && failed && message === "jwt expired" && !isTokenRefreshed) {
            //debugger;
            setTokenRefreshed(true);
            updateAccessToken();            
        }
    }, [accessToken, refreshToken, request, failed, message]);
    

    const signIn = (formData) => {
        dispatch(login(formData));
    };

    const signOut = () => {
        dispatch(logout(getCookie('refreshToken')));
    };

    const getUserProfile = () => {
        debugger;
        dispatch(getUser(getCookie('token')));
    };

    const patchUserProfile = (formData) => {
        dispatch(patchUser(getCookie('token'), formData));
    };

    const updateAccessToken = () => {
        //debugger;
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
        , signOut
        , updateAccessToken        
        , getUserProfile
        , patchUserProfile
    };
}
