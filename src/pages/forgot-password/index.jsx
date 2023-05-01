import { Link } from 'react-router-dom';
import {    
    EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const ForgotPasswordPage = () => (
    <div className={styles.wrapper}>
        <span className="text text_type_main-medium">
            Восстановление пароля
        </span>
        <EmailInput placeholder="Укажите e-mail" />
        <Button htmlType="button" type="primary" size="medium">
            Восстановить
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