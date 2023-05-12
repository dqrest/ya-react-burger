import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// shared
import { userDto } from '../../shared/dtos/user-dto';

export default function ProtectedRouteElement({ user, element }) {    

    const location = useLocation();
    const [searchParams, ] = useSearchParams();    
    const pathname = location?.pathname || '';
    let fb = searchParams.get('fallback');    

    // nonauthorized user
    if (!user) {

        if (pathname.includes('/login') 
            || pathname.includes('/forgot-password')
            || pathname.includes('/register'))
            return element;

        if (pathname.includes('/reset-password')
            && location?.state?.access
            && location?.state?.email
            && location?.state?.email?.length > 0) {
            return element;
        }

        if (pathname.includes('/profile')
            || pathname.includes('/profile/user')
            || pathname.includes('/profile/orders')) {
            fb = pathname;
        }
        const fbp = fb
            ? `?fallback=${fb}`
            : '';

        return <Navigate to={`/login${fbp}`} replace />;
    }

    // authorized user
    if (pathname.includes('/login')) {
        return <Navigate to={fb || '/'} replace />;
    }
    
    return element;
}


ProtectedRouteElement.propTypes = {
    user: userDto,
    element: PropTypes.element.isRequired
}