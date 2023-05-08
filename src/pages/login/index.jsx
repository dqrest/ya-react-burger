import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { login, refreshLogining } from '../../services/actions/auth';

// styles
import styles from '../pages.module.css';

export const getLoginedUser = (store) => ({
    user: store?.login?.item
    , loginRequest: store?.login?.loginRequest
    , loginFailed: store?.login?.loginFailed
    , message: store?.login?.message
});

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { loginRequest, loginFailed, message } = useSelector(getLoginedUser);
    const [formData, setFormData] = useState({
        password: 'snakbag12345!'
        , email: 'snakbag@mail.ru'
    });

    function loginClick(e) {
        debugger;
        e.preventDefault();
        dispatch(login(formData));
        return false;
    }

    const errorMessage = (
        <div className={styles.wrapper}>
            <span className='text text_type_main-medium'>
                Возникла ошибка: {message}
            </span>
            <br />
            <span className="text text_type_main-small mt-2">
                <Link
                    to={{ pathname: `/login` }}
                    className={`${styles.link} ml-4`}
                    onClick={() => dispatch(refreshLogining())}>
                    Войти заново?
                </Link>
            </span>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            {loginRequest && <div className='text text_type_main-medium'>Вход в систему. Ждите...</div>}
            {loginFailed && errorMessage}
            {!loginRequest && !loginFailed &&
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