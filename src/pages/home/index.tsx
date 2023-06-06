import { Outlet } from 'react-router-dom';

// styles
import { appStyle } from '../../components';
import homeStyle from './home.module.css';

export const HomePage = () => {
    return (

        <main className={`${appStyle.appBurgerPaddings} pb-5 pt-10 ${homeStyle.homeMain}`}>
            <Outlet></Outlet>
        </main>
    )
};