import { Link } from 'react-router-dom';

import {
    PasswordInput
    , Input
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const ResetPasswordPage = () => {
    return (
        <div className={styles.wrapper}>
            <span className="text text_type_main-medium">
                Восстановление пароля
            </span>
            <PasswordInput placeholder='Введите новый пароль' />
            <Input placeholder='Введите код из письма' />
            <Button htmlType="button" type="primary" size="medium">
                Сохранить
            </Button>
            <span className="text text_type_main-small mt-10">
                Вспомнили пароль?
                <Link
                    to={{ pathname: `/login` }}
                    className={`${styles.link} ml-4`}>
                    Войти
                </Link>
            </span>
        </div>
    );
}