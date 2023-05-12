import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useAuth, useProvideAuth } from '../../services/auth';

// styles
import styles from '../pages.module.css';

export const ProfileUserPage = () => {

    const { user, request, failed, message, getUserProfile, patchUserProfile } = useProvideAuth();
    const [formData, setFormData] = useState({
        name: ''
        , email: ''
    });

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        if (user && !request && !failed)
            setFormData(user);
    }, [user, request, failed])

    const errorMessage = (
        <span className='text text_type_main-default' style={{ color: 'red' }}>
            Возникла ошибка: {message}
        </span>
    );

    function formSubmit(e) {
        e.preventDefault();
        patchUserProfile(formData);
        return false;
    }

    return (
        <div className={styles.wrapper}>
            {request && <div className='text text_type_main-medium'>Загрузка профиля. Ждите...</div>}
            {!request &&
                <>
                    <form style={{ display: 'flex', flexDirection: "column" }} onSubmit={formSubmit}>
                        <Input type={'text'}
                            value={formData.name}
                            placeholder={'Имя'}
                            required
                            onChange={e => { setFormData({ ...formData, name: e.target.value });  }}
                            extraClass="mb-4"
                        />
                        <EmailInput required
                            extraClass="mb-4"
                            value={formData.email}
                            onChange={e => { setFormData({ ...formData, email: e.target.value });  }}
                        />
                        <div style={{ alignSelf: "center" }}>
                            <Button htmlType="submit"
                                type="primary"
                                size="medium">
                                ОК
                            </Button>
                            &nbsp;
                            <Button htmlType="button"
                                type="primary"
                                size="medium"
                                onClick={() => setFormData({ ...formData, email: user?.email, name: user?.name })}>
                                Отмена
                            </Button>                            
                        </div>

                    </form>
                    {failed && errorMessage}
                </>
            }
        </div>
    );
}