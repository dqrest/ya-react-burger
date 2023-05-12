import { Outlet } from 'react-router-dom';

// components
import AppHeader from '../../components/app-header/app-header';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

// styles
import { appStyle } from '../../components';
import homeStyle from './home.module.css';

export const HomePage = () => {    
    return (
        <ErrorBoundary>
            <AppHeader></AppHeader>
            <main className={`${appStyle.appBurgerPaddings} pb-5 pt-10 ${homeStyle.homeMain}`}>                
                <Outlet></Outlet>
            </main>
        </ErrorBoundary>
    )
};