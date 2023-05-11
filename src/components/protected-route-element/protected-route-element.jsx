

import { Navigate } from 'react-router-dom';

export default function ProtectedRouteElement({ user, element }) {

    debugger;

    const pathname = document.location.pathname || '';

    // nonauthorized user
    if (!user) {

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

    // switch(pathname){
    //     case '/login':
    //         return <Navigate to={``} />;       

    // }


    // authorized user
    // switch (pathname) {
    //     case '/login':
    //     case '/register':
    //     case '/forgot-password':
    //     case '/reset-password':
    //         // redirect to HomePage
    //         return <Navigate to={``} />;
    //     default:
    //         return element;
    // }
    return element;
}