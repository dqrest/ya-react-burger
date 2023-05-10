import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

// shared
import { useAuth } from '../../services/auth';
import { getCookie } from '../../shared/utils/cookie';


export default function ProtectedRouteElementFromUser({ element }) {    

    const { accessToken } = useAuth();    

    const pathname = document.location.pathname || '';

    if (accessToken) {
        switch (pathname) {
            case '/login':
            case '/register':
            case '/forgot-password':
            case '/reset-password':
                return <Navigate to={``} replace />;
            default:
                return element;
        }
    }
    return <Navigate to={`/`} replace />;
}