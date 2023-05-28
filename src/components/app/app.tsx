import { ReactElement, useEffect, useState, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// shared
import { useProvideAuth } from '../../services/auth';
import { getCookie } from '../../shared/utils/cookie';
import { GET_USER_FAILED, GET_USER_SUCCESS } from '../../services/actions/auth';
import { TUserProfileFormData } from '../../shared/types/auth-types';

// components
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from '../ingredient-details/ingredient-details';

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
    , NotFound404Page
    , LoadingPage
} from '../../pages';

type TProtectedAppProps = {
    user?: TUserProfileFormData | null
}

const ProtectedApp: FC<TProtectedAppProps> = ({ user }): ReactElement => {

    const location = useLocation();
    const background = location?.state?.background;

    return (
        <Routes location={background || location}>
            <Route path="/" element={<HomePage />}>
                <Route path="" element={<BurgerContructorPage />} />
                <Route path="login" element={<ProtectedRouteElement user={user} element={<LoginPage />} />} />
                <Route path="register" element={<ProtectedRouteElement user={user} element={<RegisterPage />} />} />
                <Route path="forgot-password" element={<ProtectedRouteElement user={user} element={<ForgotPasswordPage />} />} />
                <Route path="reset-password" element={<ProtectedRouteElement user={user} element={<ResetPasswordPage />} />} />
                <Route path="profile" element={<ProtectedRouteElement user={user} element={<ProfilePage />} />}>
                    <Route path="user" element={<ProtectedRouteElement user={user} element={<ProfileUserPage />} />} />
                    <Route path="orders" element={<ProtectedRouteElement user={user} element={<ProfileOrdersPage />} />} />
                </Route>
                {!background && <Route path="ingredients/:id" element={<IngredientDetails />} />}
            </Route>
            <Route path="*" element={<NotFound404Page />} />
        </Routes>
    );
}

function LoadingApp() {
    return (
        <Routes>
            <Route path="*" element={<LoadingPage />} />
        </Routes>
    );
}

export default function App() {

    const auth = useProvideAuth();
    const [userLoaded, setUserLoaded] = useState<boolean>(getCookie('token') ? false : true);

    useEffect(() => {
        if (getCookie('token'))
            auth.getUserProfile();
    }, []);

    useEffect(() => {
        if (auth?.actionType === GET_USER_FAILED || auth?.actionType === GET_USER_SUCCESS)
            setUserLoaded(true);
    }, [auth.actionType]);


    
    return (
        <Router>
            {userLoaded
                ? <ProtectedApp user={auth?.user} />
                : <LoadingApp />
            }
        </Router>
    );
}


