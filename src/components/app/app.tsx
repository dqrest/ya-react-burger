import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// shared
import { ProvideAuth } from '../../services/auth';

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
} from '../../pages';

export default function App() {
    return (
        <ProvideAuth>
            <Router>
                <Routes>
                    <Route path="/" element={ <HomePage />}>
                        <Route path="" element={<BurgerContructorPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="reset-password" element={<ResetPasswordPage />} />
                        <Route path="profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
                            <Route path="user" element={<ProtectedRouteElement element={<ProfileUserPage />} /> }/>
                            <Route path="orders" element={<ProtectedRouteElement element={<ProfileOrdersPage />} />} />
                        </Route>
                        <Route path="ingredients/:id" element={<IngredientPage />} />
                    </Route>
                    <Route path="*" element={<NotFound404Page />} />
                </Routes>
            </Router>
        </ProvideAuth>
    );
}
