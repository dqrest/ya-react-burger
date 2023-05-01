import { Link } from 'react-router-dom';
import {
    PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';


// styles
import loginStyles from './login.module.css';

export const LoginPage = () => (
    <div className={loginStyles.wrapper}>
        <span className="text text_type_main-medium">
            Вход
        </span>
        <PasswordInput />
        <EmailInput />
        <Button htmlType="button" type="primary" size="medium">
            Войти
        </Button>
        <span className="text text_type_main-small mt-10">
            Вы - новый пользователь?
            <Link
                to={{ pathname: `/register` }}
                className={`${loginStyles.link} ml-4`}>
                Зарегистрироваться
            </Link>
        </span>
        <span className="text text_type_main-small">
            Забыли пароль?
            <Link
                to={{ pathname: `/forgot-password` }}
                className={`${loginStyles.link} ml-4`}>
                Восстановить пароль
            </Link>
        </span>
    </div>
);