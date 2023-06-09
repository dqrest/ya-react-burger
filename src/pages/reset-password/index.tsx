import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';

// shared
import { resetPassword } from '../../services/actions/auth';
import { TResetPasswordFormData } from '../../shared/types/auth-types';
import { useDispatch } from '../../services/hooks';
import { getResetPassword } from '../../services/selectors/auth';
import { useSelector } from '../../services/hooks';

import {
    PasswordInput
    , Input
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const { resetPasswordRequest, resetPasswordFailed, message } = useSelector(getResetPassword);
    const [resetClicked, setResetClicked] = useState<boolean>(false);
    const [formData, setFormData] = useState<TResetPasswordFormData>({
        password: ''
        , token: ''
    });

    const errorMessage = (
        <span className={`text text_type_main-default ${styles.errorText}`}>
            Возникла ошибка: {message}
        </span>
    );

    const moveToLogin = (
        <span className="text text_type_main-small mt-10">
            Пароль успешно изменен.
            <Link
                to={{ pathname: `/login` }}
                className={`${styles.link} ml-4`}>
                Войти в приложение?
            </Link>
        </span>
    );

    function resetSubmit(e: FormEvent<HTMLFormElement>): boolean {
        e.preventDefault();
        setResetClicked(true);
        dispatch(resetPassword(formData));
        return false;
    }

    return (
        <div className={styles.wrapper}>
            {resetClicked && !resetPasswordRequest && !resetPasswordFailed && moveToLogin}
            {!resetClicked && resetPasswordRequest && <div className='text text_type_main-medium'>Восстановление пароля. Ждите...</div>}
            {!resetClicked && !resetPasswordRequest &&
                <>
                    <span className="text text_type_main-medium">
                        Восстановление пароля
                    </span>

                    <form className={styles.formColumn} onSubmit={resetSubmit}>
                        <PasswordInput required
                            extraClass="mb-4"
                            value={formData.password}
                            placeholder='Введите новый пароль'
                            onChange={e => { setFormData({ ...formData, password: e.target.value }); console.log(JSON.stringify(formData)); }}
                        />
                        <Input required
                            placeholder='Введите код из письма'
                            extraClass="mb-4"
                            value={formData.token}
                            onChange={e => { setFormData({ ...formData, token: e.target.value }); console.log(JSON.stringify(formData)); }}
                        />
                        <div className={styles.buttonsWrapper}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="medium">
                                Сохранить
                            </Button>
                        </div>
                    </form>
                    <span className="text text_type_main-small mt-10">
                        Вспомнили пароль?
                        <Link
                            to={{ pathname: `/login` }}
                            className={`${styles.link} ml-4`}>
                            Войти
                        </Link>
                    </span>

                    {resetPasswordFailed && errorMessage}
                </>
            }
        </div>
    );
}