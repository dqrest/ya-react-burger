import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useDispatch } from '../../services/hooks';
import { register, refreshRegistering } from '../../services/actions/auth';
import { TUserProfileFormData } from '../../shared/types/auth-types';
import { getRegisteredUser } from '../../services/selectors/auth';
import { useSelector } from '../../services/hooks';

// styles
import styles from '../pages.module.css';

export const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { registerRequest, registerFailed, message } = useSelector(getRegisteredUser);
    const [registerClicked, setRegisterClicked] = useState<boolean>(false);

    const [formData, setFormData] = useState<TUserProfileFormData>({
        name: ''
        , password: ''
        , email: ''
    });

    useEffect(() => {
        if (!registerRequest && !registerFailed && registerClicked) {
            navigate('/profile/user');
        }
    }, [registerRequest, registerFailed, registerClicked])

    function registerClick(e: FormEvent<HTMLFormElement>): boolean {
        e.preventDefault();
        setRegisterClicked(true);
        dispatch(register(formData));
        return false;
    }

    const errorMessage = (
        <div className={styles.wrapper}>
            <span className='text text_type_main-medium'>
                Возникла ошибка: {message}
            </span>
            <br />
            <span className="text text_type_main-small mt-2">
                Зарегистрироваться заново?
                <Link
                    to={{ pathname: `/register` }}
                    className={`${styles.link} ml-4`}
                    onClick={() => dispatch(refreshRegistering())}>
                    Регистрация
                </Link>
            </span>
        </div>
    );

    return (        
        <div className={styles.wrapper}>
            {registerRequest && <div className='text text_type_main-medium'>Происходит регистрация. Ждите...</div>}
            {registerFailed && errorMessage}
            {!registerRequest && !registerFailed &&
                <>
                    <span className="text text_type_main-medium">
                        Регистрация
                    </span>
                    <form className={styles.formColumn} onSubmit={registerClick}>
                        <Input type={'text'}
                            value={formData.name}
                            placeholder={'Имя'}
                            required
                            onChange={e => { setFormData({ ...formData, name: e.target.value }); console.log(JSON.stringify(formData)); }}
                            extraClass="mb-4"
                        />
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
                        <div className={styles.buttonsWrapper}>
                            <Button htmlType="submit"
                                type="primary"
                                size="medium"
                                onClick={() => false}>
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                    <span className="text text_type_main-small mt-10">
                        Уже зарегистрированы?
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