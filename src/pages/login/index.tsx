import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import {
    PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useProvideAuth } from '../../services/auth';
import { TLoginFormData } from '../../shared/types/auth-types';

// styles
import styles from '../pages.module.css';

export const LoginPage = () => {

    const { signIn, request, failed, message } = useProvideAuth();

    const [formData, setFormData] = useState<TLoginFormData>({
        password: ''
        , email: ''
    });

    function loginClick(e: FormEvent<HTMLFormElement>): boolean {
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














//