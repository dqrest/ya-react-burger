import { Navigate } from 'react-router-dom';

export default function ProtectedRouteElement({ user, element }) {
    
    // nonauthorized user
    if (!user) {
        const pathname = document.location.pathname || '';

        const fallback = pathname === '/login'
            ? '/'
            : pathname;

        const fallbackParam = fallback
            ? `?fallback=${fallback}`
            : null;        

        if (pathname.includes('/login'))
            return element;        

        return <Navigate to={`/login${fallbackParam}`} />;
    }    
    return element;
}