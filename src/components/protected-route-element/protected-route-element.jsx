import { Navigate } from 'react-router-dom';


export default function ProtectedRouteElement({ user, element, state }) {

    // nonauthorized user
    if (!user) {
        const pathname = document.location.pathname || '';

        if (pathname.includes('/login'))
            return element;

        if (pathname.includes('/forgot-password'))
            return element;

        if (pathname.includes('/reset-password')
            && window?.history?.state?.usr?.access
            && window?.history?.state?.usr?.email
            && window?.history?.state?.usr?.email?.length > 0) {               
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