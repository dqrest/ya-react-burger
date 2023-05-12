import { Navigate, useLocation } from 'react-router-dom';



export default function ProtectedRouteElement({ user, element, state }) {

    const location = useLocation();

    // nonauthorized user
    if (!user) {
        const pathname = document.location.pathname || '';

        if (pathname.includes('/login'))
            return element;

        if (pathname.includes('/forgot-password'))
            return element;

        if (pathname.includes('/reset-password')
            && location?.state?.access
            && location?.state?.email
            && location?.state?.email?.length > 0) {              
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