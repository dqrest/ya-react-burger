import { Outlet } from 'react-router-dom';

// components
import AppHeader from '../../components/app-header/app-header';
import ErrorBoundary from '../../components/error-boundary/error-boundary';

// styles
import { appStyle } from '../../components';
import appPageStyle  from './app-page.module.css';

export const AppPage = () => (
    <ErrorBoundary>       
        <AppHeader></AppHeader>
        <main className={`${appStyle.appBurgerPaddings} pb-5 pt-10 ${appPageStyle.appPageMain}`}>
            <Outlet></Outlet>
        </main>      
    </ErrorBoundary>
);