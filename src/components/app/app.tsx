import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import {
    HomePage
    , BurgerContructorPage
    , LoginPage
    , RegisterPage
    , ForgotPasswordPage
    , ResetPasswordPage
    , ProfilePage
    , IngredientPage
    , NotFound404Page
} from '../../pages';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="" element={<BurgerContructorPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="ingredients/:id" element={<IngredientPage />} />
                </Route>
                <Route path="*" element={<NotFound404Page />} />
            </Routes>
        </Router>        
    );
}
