import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// shared
import { useProvideAuth } from '../../services/auth';
import { LOGOUT_USER_SUCCESS } from '../../services/actions/auth';

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
    , url: '/login'
    , key: 'logout'
    , tooltip: 'Выйти из системы'
}];

export const ProfileMenu = () => {

    const [selectedItem, setSelectedItem] = useState();
    const { signOut, actionType } = useProvideAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (menuIems?.length > 0 && menuIems[0]?.url?.length > 0) {
            setSelectedItem(menuIems[0]);
            navigate(menuIems[0].url);
        }
    }, []);

    useEffect(() => {
        if(actionType === LOGOUT_USER_SUCCESS){            
            navigate('/login?fallback=/profile/user', {replace: true});
        }
    }, [actionType])

    return (
        <>
            <ul className={menuStyles.list}>
                {menuIems.map((item) => (
                    <li key={item.key}
                        className={`text text_type_main-default ${menuStyles.item} ${selectedItem?.key === item?.key && menuStyles.selected}`}
                        onClick={() => { debugger; if (item?.key === 'logout') { debugger; signOut(); return; } setSelectedItem(item); navigate(item?.url, { replace: true }); }}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className={`text text_type_main-small ${menuStyles.item} mt-15`}>
                {selectedItem?.tooltip}
            </div>
        </>
    );
}