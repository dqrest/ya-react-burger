import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getForgottenPassword } from '../../pages/forgot-password';
import { refreshForgotingPassword, FORGOT_PASSWORD_SUCCESS } from '../../services/actions/auth';


export default function ProtectedRouteElement({ user, element }) {

    const resetPasswordAction = useSelector(getForgottenPassword);
    const dispatch = useDispatch();

    // nonauthorized user
    if (!user) {
        const pathname = document.location.pathname || '';

        if (pathname.includes('/login'))
            return element;

        if (pathname.includes('/forgot-password'))
            return element;

        if (pathname.includes('/reset-password')
            //&& resetPasswordAction?.actionType === FORGOT_PASSWORD_SUCCESS
            && resetPasswordAction?.email
            && resetPasswordAction?.email.length > 0) {
            debugger;
            return element;
        }

        const fallback = pathname === '/login'
            ? '/'
            : pathname;

        const fallbackParam = fallback
            ? `?fallback=${fallback}`
            : null;



        return <Navigate to={`/login${fallbackParam}`} />;
    }
    return element;
}