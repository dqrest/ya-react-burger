import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// shared
import { useProvideAuth } from '../../services/auth';
import { getCookie } from '../../shared/utils/cookie';
import { GET_USER_FAILED, GET_USER_SUCCESS } from '../../services/actions/auth';
import { AuthContext } from '../../shared/contexts/auth-context';

// components
import ProtectedRouteElement from '../protected-route-element/protected-route-element';

// pages
import {
    HomePage
    , BurgerContructorPage
    , LoginPage
    , RegisterPage
    , ForgotPasswordPage
    , ResetPasswordPage
    , ProfilePage
    , ProfileUserPage
    , ProfileOrdersPage
    , IngredientPage
    , NotFound404Page
    , LoadingPage
} from '../../pages';


function AuthApp({ user }) {    
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="" element={<BurgerContructorPage />} />
                        <Route path="login" element={<ProtectedRouteElement user={user} element={<ProfilePage />} />} />
                        <Route path="profile" element={<ProtectedRouteElement user={user} element={<ProfilePage />} />}>
                            <Route path="user" element={<ProtectedRouteElement user={user} element={<ProfileUserPage />} />} />
                            <Route path="orders" element={<ProtectedRouteElement user={user} element={<ProfileOrdersPage />} />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound404Page />} />
                </Routes>
            </Router>
        </>
    );
}

function UnAuthApp({ user }) {    
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="" element={<BurgerContructorPage />} />
                        <Route path="login" element={<ProtectedRouteElement user={user} element={<LoginPage />} />} />
                        <Route path="register" element={<ProtectedRouteElement user={user} element={<RegisterPage />} />} />
                        <Route path="forgot-password" element={<ProtectedRouteElement user={user} element={<ForgotPasswordPage />} />} />
                        <Route path="reset-password" element={<ProtectedRouteElement user={user} element={<ResetPasswordPage />} />} />
                        <Route path="profile" element={<ProtectedRouteElement user={user} element={<LoginPage />} />}>
                            <Route path="user" element={<ProtectedRouteElement user={user} element={<LoginPage />} />} />
                            <Route path="orders" element={<ProtectedRouteElement user={user} element={<LoginPage />} />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound404Page />} />
                </Routes>
            </Router>
        </>
    );
}

function LoadingApp() {    
    return (
        <Router>
            <Routes>
                <Route path="*" element={<LoadingPage />} />
            </Routes>
        </Router>
    );
}

export default function App() {

    const auth = useProvideAuth();
    const [userLoaded, setUserLoaded] = useState(getCookie('token') ? false : true);    

    useEffect(() => {
        if (getCookie('token'))
            auth.getUserProfile();
    }, []);

    useEffect(() => {
        if (auth?.actionType === GET_USER_FAILED || auth?.actionType === GET_USER_SUCCESS)
            setUserLoaded(true);
    }, [auth.actionType]);   

    return (
        <>
            {userLoaded && auth?.user
                ? <AuthApp user={auth?.user} />
                : <UnAuthApp user={auth?.user} />
            }
            {!userLoaded && <LoadingApp />}
        </>
    );
}
