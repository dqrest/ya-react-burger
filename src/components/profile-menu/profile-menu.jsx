import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// styles
import menuStyles from './profile-menu.module.css';

const menuIems = [{
    title: 'Профиль'
    , url: '/profile-user'
    , key: 'profile-user'
}, {
    title: 'История заказов'
    , url: '/profile/orders'
    , key: 'profile-order'
}, {
    title: 'Выход'
    , url: '/logout'
    , key: 'logout'
}];

export const ProfileMenu = () => {

    const [selectedItem, setSelectedItem] = useState();
    useEffect(() => menuIems?.length > 1 && setSelectedItem(menuIems[1]?.key)
        , []);

    return (
        <ul className={menuStyles.list}>{menuIems.map((item) => (
            <li key={item.key}
                className={`text text_type_main-default ${menuStyles.item} ${menuStyles.item} ${selectedItem === item?.key && menuStyles.selected}`}
                onClick={() => setSelectedItem(item?.key)}>

                <Link key={`link_${item.key}`}
                    className={`${menuStyles.link}`}
                    to={`${item.url}`}>
                    {item.title}
                </Link>

            </li>
        ))}</ul>
    );
}