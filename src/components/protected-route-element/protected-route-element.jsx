import { useEffect, useState } from 'react';

import { Navigate, useNavigate } from 'react-router-dom';

// shared
import { useAuth } from '../../services/auth';
import { getCookie } from '../../shared/utils/cookie';

export default function ProtectedRouteElement({ element }) {
    
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

    const fallback = document.location.pathname !== '/login'
        ? document.location.pathname
        : null;

    const fallbackParam = fallback
        ? `?fallback=${fallback}`
        : null;

    return user ? element : <Navigate to={`/login${fallbackParam}`} replace />;
}