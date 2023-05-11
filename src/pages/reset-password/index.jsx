import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

// shared
import { forgotPassword, refreshForgotingPassword, FORGOT_PASSWORD_SUCCESS } from '../../services/actions/auth';

import {
    PasswordInput
    , Input
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// styles
import styles from '../pages.module.css';

export const getResetPassword = (store) => ({    
    resetPasswordRequest: store?.resetPassword?.resetPasswordRequest
    , resetPasswordFailed: store?.resetPassword?.resetPasswordFailed
    , message: store?.resetPassword?.message
    , actionType: store?.resetPassword?.actionType    
});

export const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const { resetPasswordRequest, resetPasswordFailed, message } = useSelector(getResetPassword);
    const [formData, setFormData] = useState({
        password: ''
        , token: ''
    });

    

    useEffect(() => {
        //dispatch(refreshForgotingPassword());
    }, []);


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