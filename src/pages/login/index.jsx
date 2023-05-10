import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import {
    PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useAuth } from '../../services/auth';
import { LOGIN_USER_SUCCESS } from '../../services/actions/auth';

// styles
import styles from '../pages.module.css';

export const LoginPage = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const fallback = searchParams?.get('fallback');

    const { signIn, request, failed, message, actionType } = useAuth();
    const [formData, setFormData] = useState({
        password: 'snakbag12345!'
        , email: 'snakbag@mail.ru'
    });

    useEffect(() => {
        switch (actionType) {
            case LOGIN_USER_SUCCESS:
                // login success ---> redirect to fallback
                fallback && navigate(fallback, { replace: true });
                break;
        }

    }, [actionType]);

    function loginClick(e) {
        e.preventDefault();
        signIn(formData);
        return false;
    }

    const errorMessage = (
        <span className='text text_type_main-default' style={{ color: 'red' }}>
            Возникла ошибка: {message}
        </span>
    );

    return (
        <div className={styles.wrapper}>
            {request && <div className='text text_type_main-medium'>Вход в систему. Ждите...</div>}
            {!request &&
                <>
                    <span className="text text_type_main-medium">
                        Вход
                    </span>

                    <form style={{ display: 'flex', flexDirection: "column" }} onSubmit={loginClick}>
                        <EmailInput required
                            extraClass="mb-4"
                            value={formData.email}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }); console.log(JSON.stringify(formData)); }}
                        />
                        <PasswordInput required
                            extraClass="mb-4"
                            value={formData.password}
                            onChange={e => { setFormData({ ...formData, password: e.target.value }); console.log(JSON.stringify(formData)); }}
                        />
                        <div style={{ alignSelf: "center" }}>
                            <Button htmlType="submit"
                                type="primary"
                                size="medium">
                                Войти
                            </Button>
                        </div>
                    </form>

                    {failed && errorMessage}

                    <span className="text text_type_main-small mt-10">
                        Вы - новый пользователь?
                        <Link
                            to={{ pathname: `/register` }}
                            className={`${styles.link} ml-4`}>
                            Зарегистрироваться
                        </Link>
                    </span>

                    <span className="text text_type_main-small">
                        Забыли пароль?
                        <Link
                            to={{ pathname: `/forgot-password` }}
                            className={`${styles.link} ml-4`}>
                            Восстановить пароль
                        </Link>
                    </span>
                </>
            }

        </div>
    );
}