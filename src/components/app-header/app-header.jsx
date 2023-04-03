import React from 'react';

import headerStyle from './app-header.module.css';

import {
    Logo
    , BurgerIcon
    , ListIcon
    , ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';


class AppHeader extends React.Component {

    render() {
        return (
            <header className={`${headerStyle.header} app-burger-paddings`}>

                <a className={headerStyle.item} title="Конструктор">
                    <BurgerIcon type="primary"></BurgerIcon>
                    <span className={`text text_type_main-small ${headerStyle.itemTitle}`}>
                        Конструктор
                    </span>
                </a>

                <a className={headerStyle.item} title="Лента заказов">
                    <ListIcon type="secondary"></ListIcon>
                    <span className={`text text_type_main-small text_color_inactive ${headerStyle.itemTitle}`}>
                        Лента заказов
                    </span>
                </a>

                <a style={{ flexGrow: 1, justifyContent: 'center', display: 'flex', flexShrink: 0 }}>
                    <Logo></Logo>
                </a>              

                <a className={`text_color_inactive ${headerStyle.item}`} title="Личный кабинет">
                    <ProfileIcon type="secondary"></ProfileIcon>
                    <span className={`text text_type_main-small ${headerStyle.itemTitle}`}>
                        Личный кабинет
                    </span>
                </a>

            </header>
        );
    }   
}

export default AppHeader;