import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import headerStyle from './app-header.module.css';
import appStyle from '../app/app.module.css';

import {
    Logo
    , BurgerIcon
    , ListIcon
    , ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useProvideAuth } from '../../services/auth';

export default function AppHeader() {

    const { user } = useProvideAuth();
    const [selectedItem, setSelectedItem] = useState<string>('home');

    useEffect(() => {
        switch (document.location.pathname) {
            case '/':
                setSelectedItem('home');
                break;
            case '/feed':
                setSelectedItem('feed');
                break;
            case '/login':
            case '/profile':
            case '/profile/user':
            case '/profile/orders':
                setSelectedItem('profile');
                break;
        }
    }, []);

    return (
        <header className={`${headerStyle.header} ${appStyle.appBurgerPaddings}`}>

            <Link className={`${headerStyle.item} ${headerStyle.link} mt-4 mb-4 ${selectedItem === 'home' && headerStyle.selected}`}
                to='/'
                title="Конструктор"
                onClick={() => setSelectedItem('home')}>
                <BurgerIcon type={`${selectedItem === 'home' ? 'primary' : 'secondary'}`}></BurgerIcon>
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Конструктор
                </span>
            </Link>

            <Link className={`${headerStyle.item} ${headerStyle.link}  mt-4 mb-4 ml-2 ${selectedItem === 'feed' && headerStyle.selected}`}
                title="Лента заказов"
                to='/feed'
                onClick={() => setSelectedItem('feed')}>
                <ListIcon type={`${selectedItem === 'feed' ? 'primary' : 'secondary'}`} />
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Лента заказов
                </span>
            </Link>

            <a href='#' className={headerStyle.logoWrapper}>
                <Logo></Logo>
            </a>

            <Link className={`${headerStyle.item} ${headerStyle.link} ${selectedItem === 'profile' && headerStyle.selected}`}
                to={user ? '/profile/user' : '/login?fallback=/profile/user'}
                title={user?.name || 'Личный кабинет'}
                onClick={() => setSelectedItem('profile')}>
                <ProfileIcon type={`${selectedItem === 'profile' ? 'primary' : 'secondary'}`} />
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    {user?.name || 'Личный кабинет'}
                </span>
            </Link>

        </header>
    );
}