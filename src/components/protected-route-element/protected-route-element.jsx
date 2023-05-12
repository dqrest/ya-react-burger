import { Navigate, useLocation, useSearchParams } from 'react-router-dom';

export default function ProtectedRouteElement({ user, element }) {

    debugger;

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    //const pathname = document.location.pathname || '';
    const pathname = location?.pathname || '';
    const fb = searchParams.get('fallback');


    // nonauthorized user
    if (!user) {


        if (pathname.includes('/login'))
            return element;

        if (pathname.includes('/reset-password')
            && location?.state?.access
            && location?.state?.email
            && location?.state?.email?.length > 0) {
            return element;
        }

        if (pathname.includes('/profile')
            || pathname.includes('/profile/user')
            || pathname.includes('/profile/orders')
            || pathname.includes('/forgot-password')) {
            fb = pathname;
        }
        const fbp = fb
            ? `?fallback=${fb}`
            : null;

        return <Navigate to={`/login${fbp}`} replace />;
    }

    // authorized user
    if (pathname.includes('/login')) {
        return <Navigate to={fb || '/'} replace />;
    }
    
    return element;
}