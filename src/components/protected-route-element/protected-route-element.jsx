import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

// shared
import { useAuth } from '../../services/auth';

export default function ProtectedRouteElement({ element }) {
    debugger;
    const { user, getUserProfile } = useAuth();

    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = async () => {
        await getUserProfile();
        setUserLoaded(true);
    };

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return user ? element : <Navigate to="/login" replace />;
}