import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import {
    forgotPassword
    , refreshForgotingPassword
} from '../../services/actions/auth';
import { TForgotPasswordFormData } from '../../shared/types/auth-types';
import { useDispatch } from '../../services/hooks';
import { getForgottenPassword } from '../../services/selectors/auth';
import { useSelector } from '../../services/hooks';

// styles
import styles from '../pages.module.css';

export const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { forgotPasswordRequest, forgotPasswordFailed, message } = useSelector(getForgottenPassword);
    const [resetClicked, setResetClicked] = useState<boolean>(false);

    useEffect(() => {
        if (!forgotPasswordRequest && !forgotPasswordFailed && resetClicked) {
            navigate('/reset-password', { state: { access: true, email: formData?.email } });
            setResetClicked(false);
        }
    }, [resetClicked, forgotPasswordRequest, forgotPasswordFailed]);

    const [formData, setFormData] = useState<TForgotPasswordFormData>({
        email: ''
    });

    function forgotPasswordSubmit(e: FormEvent<HTMLFormElement>): boolean {
        e.preventDefault();
        setResetClicked(true);
        dispatch(forgotPassword(formData));
        return false;
    }

    const errorMessage = (
        <div className={styles.wrapper}>
            <span className='text text_type_main-medium'>
                Возникла ошибка: {message || 'Неопознанная ошибка...'}
            </span>
            <br />
            <span className="text text_type_main-small mt-2">
                <Link
                    to={{ pathname: `/forgot-password` }}
                    className={`${styles.link} ml-4`}
                    onClick={() => dispatch(refreshForgotingPassword())}>
                    Восстаносить заново?
                </Link>
            </span>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            {forgotPasswordRequest && <div className='text text_type_main-medium'>Восстановление пароля. Ждите...</div>}
            {forgotPasswordFailed && errorMessage}
            {!forgotPasswordRequest && !forgotPasswordFailed &&
                <>
                    <span className="text text_type_main-medium">
                        Восстановление пароля
                    </span>

                    <form className={styles.formColumn} onSubmit={forgotPasswordSubmit}>
                        <EmailInput required
                            extraClass="mb-4"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        <div className={styles.buttonsWrapper}>
                            <Button htmlType="submit"
                                type="primary"
                                size="medium">
                                Восстановить
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
                </>
            }
        </div>
    );
}

