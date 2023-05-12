import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { register, refreshRegistering } from '../../services/actions/auth';

// styles
import styles from '../pages.module.css';

export const getUser = (store) => ({
    user: store?.register?.item
    , registerRequest: store?.register?.registerRequest
    , registerFailed: store?.register?.registerFailed
    , message: store?.register?.message
});

export const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();    
    const { registerRequest, registerFailed, message } = useSelector(getUser);
    const [registerClicked, setRegisterClicked] = useState(false);

    const [formData, setFormData] = useState({
        name: ''
        , password: ''
        , email: ''
    });

    useEffect(() => {
        if(!registerRequest && !registerFailed && registerClicked ){            
            navigate('/profile/user');           
        }        
    }, [registerRequest, registerFailed, registerClick])

    function registerClick(e) {
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
                    <form style={{ display: 'flex', flexDirection: "column" }} onSubmit={registerClick}>
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
                        <div style={{ alignSelf: "center" }}>
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