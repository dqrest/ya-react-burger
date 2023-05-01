import {
    Input
    , PasswordInput
    , EmailInput    
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const ProfileUserPage = () => (
    <div className={styles.wrapper}>
        <Input placeholder='Имя' />
        <EmailInput placeholder='Логин' />
        <PasswordInput  />
    </div>
);