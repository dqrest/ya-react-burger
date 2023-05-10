import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

// shared
import { useAuth } from '../../services/auth';
import { getCookie } from '../../shared/utils/cookie';

export default function ProtectedRouteElement({ element }) {
    // debugger;
    const { user, getUserProfile, request } = useAuth();
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        if (getCookie('token'))
            getUserProfile();
        else
            setUserLoaded(true);
    }, []);

    useEffect(() => {
        if (!request && user)
            setUserLoaded(true);
    }, [request, user]);

    if (!userLoaded) return null;

    const pathname = document.location.pathname || '';

    // authorized case
    // if (user) {
    //     switch (pathname) {
    //         case '/login':
    //         case '/register':
    //         case '/forgot-password':
    //         case '/reset-password':
    //             return <Navigate to={`/`} replace />;
    //         default:
    //             return element;
    //     }
    // }

    // // nonautorized case
    // switch (pathname) {
    //     case '/login':
    //         return element;
    // }

    const fallback = pathname !== '/login'
        ? pathname
        : '/';

    const fallbackParam = fallback
        ? `?fallback=${fallback}`
        : null;

    return user ? element : <Navigate to={`/login${fallbackParam}`} replace />;
}