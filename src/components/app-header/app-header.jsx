import React, { useState } from 'react';
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

export default function AppHeader() {

    const [selectedItem, setSelectedItem] = useState('home');

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

            <Link className={`${headerStyle.item} ${headerStyle.link}  mt-4 mb-4 ml-2 ${selectedItem === 'history-order' && headerStyle.selected}`}
                title="Лента заказов"
                to='/history-order'
                onClick={() => setSelectedItem('history-order')}>
                <ListIcon type={`${selectedItem === 'history-order' ? 'primary' : 'secondary'}`} />
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Лента заказов
                </span>
            </Link>

            <a href='#' style={{ flexGrow: 1, justifyContent: 'center', display: 'flex', flexShrink: 0 }}>
                <Logo></Logo>
            </a>

            <Link className={`${headerStyle.item} ${headerStyle.link} ${selectedItem === 'profile' && headerStyle.selected}`}
                to='/profile'
                title="Личный кабинет"
                onClick={() => setSelectedItem('profile')}>
                <ProfileIcon type={`${selectedItem === 'profile' ? 'primary' : 'secondary'}`} /> 
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Личный кабинет
                </span>
            </Link>

        </header>
    );
}