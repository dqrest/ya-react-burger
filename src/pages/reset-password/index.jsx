import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// shared
import { forgotPassword, refreshForgotingPassword, FORGOT_PASSWORD_SUCCESS, resetPassword } from '../../services/actions/auth';

import {
    PasswordInput
    , Input
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const getResetPassword = (store) => ({
    request: store?.resetPassword?.resetPasswordRequest
    , failed: store?.resetPassword?.resetPasswordFailed
    , message: store?.resetPassword?.message
    , actionType: store?.resetPassword?.actionType
});

export const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const { request, failed, message } = useSelector(getResetPassword);
    const [resetClicked, setResetClicked] = useState(false);
    const [formData, setFormData] = useState({
        password: '123456QQ_12340'
        , token: '123456789'
    });

    useEffect(() => {
        //dispatch(refreshForgotingPassword());
        if (resetClicked && !failed && !request) {

        }
    }, [resetClicked, failed, request]);

    const errorMessage = (
        <span className='text text_type_main-default' style={{ color: 'red' }}>
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

    function resetSubmit(e) {
        e.preventDefault();
        setResetClicked(true);
        dispatch(resetPassword(formData));
        return false;
    }

    return (
        <div className={styles.wrapper}>
            {resetClicked && !request && !failed && moveToLogin}
            {!resetClicked && request && <div className='text text_type_main-medium'>Восстановление пароля. Ждите...</div>}
            {!resetClicked && !request &&
                <>
                    <span className="text text_type_main-medium">
                        Восстановление пароля
                    </span>

                    <form style={{ display: 'flex', flexDirection: "column" }} onSubmit={resetSubmit}>
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
                        <div style={{ alignSelf: "center" }}>
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

                    {failed && errorMessage}
                </>
            }
        </div>
    );
}