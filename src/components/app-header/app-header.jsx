import React from 'react';

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
    return (
        <header className={`${headerStyle.header} ${appStyle.appBurgerPaddings}`}>

            <a className={`${headerStyle.item} mt-4 mb-4`} title="Конструктор">
                <BurgerIcon type="primary"></BurgerIcon>
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Конструктор
                </span>
            </a>

            <a className={`${headerStyle.item} text_color_inactive mt-4 mb-4 ml-2`} title="Лента заказов">
                <ListIcon type="secondary"></ListIcon>
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Лента заказов
                </span>
            </a>

            <a style={{ flexGrow: 1, justifyContent: 'center', display: 'flex', flexShrink: 0 }}>
                <Logo></Logo>
            </a>

            <a className={`${headerStyle.item} text_color_inactive`} title="Личный кабинет">
                <ProfileIcon type="secondary"></ProfileIcon>
                <span className={`${headerStyle.itemTitle} text text_type_main-small ml-2`}>
                    Личный кабинет
                </span>
            </a>

        </header>
    );
}