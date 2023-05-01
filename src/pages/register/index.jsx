import { Link } from 'react-router-dom';
import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const RegisterPage = () => (
    <div className={styles.wrapper}>
        <span className="text text_type_main-medium">
            Регистрация
        </span>
        <Input type={'text'}
            placeholder={'Имя'} />
        <EmailInput />
        <PasswordInput />        
        <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
        </Button>      
        <span className="text text_type_main-small mt-10">
            Уже зарегистрированы?
            <Link
                to={{ pathname: `/login` }}
                className={`${styles.link} ml-4`}>
                Войти
            </Link>
        </span>
    </div>
);