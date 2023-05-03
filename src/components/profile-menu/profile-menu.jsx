import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// styles
import menuStyles from './profile-menu.module.css';

const menuIems = [{
    title: 'Профиль'
    , url: '/profile/user'
    , key: 'profile-user'
    , tooltip: 'В этом разделе Вы можете изменить свои персональные данные'
}, {
    title: 'История заказов'
    , url: '/profile/orders'
    , key: 'profile-order'
    , tooltip: 'В этом разделе Вы можете просмотреть свою историю заказов'
}, {
    title: 'Выход'
    , url: '/logout'
    , key: 'logout'
    , tooltip: 'Выйти из системы'
}];

export const ProfileMenu = () => {

    const [selectedItem, setSelectedItem] = useState();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (menuIems?.length > 0 && menuIems[0]?.url?.length > 0) {
            setSelectedItem(menuIems[0]);
            navigate(menuIems[0].url);
        }
    }, []);

    return (
        <>
            <ul className={menuStyles.list}>
                {menuIems.map((item) => (
                    <li key={item.key}
                        className={`text text_type_main-default ${menuStyles.item} ${menuStyles.item} ${selectedItem?.key === item?.key && menuStyles.selected}`}
                        onClick={() => setSelectedItem(item)}>

                        <Link key={`link_${item.key}`}
                            className={`${menuStyles.link}`}
                            to={`${item.url}`}>
                            {item.title}
                        </Link>

                    </li>
                ))}
            </ul>
            <div className={`text text_type_main-small ${menuStyles.item} mt-15`}>
                {selectedItem?.tooltip}
            </div>
        </>
    );
}